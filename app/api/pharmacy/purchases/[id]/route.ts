import { NextRequest, NextResponse } from 'next/server';
import { query, transaction } from '@/lib/db';
import { PurchaseSchema } from '@/lib/validations/purchase';

// GET /api/pharmacy/purchases/[id] – fetch one purchase with its items
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    // Get purchase header
    const purchaseResult = await query(
      `SELECT p.*, s.name as supplier_name 
       FROM purchases p
       LEFT JOIN suppliers s ON p.supplier_id = s.id
       WHERE p.id = $1`,
      [parsedId]
    );

    if (purchaseResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Purchase not found' }, { status: 404 });
    }

    // Get items
    const itemsResult = await query(
      `SELECT pi.*, m.name as medicine_name
       FROM purchase_items pi
       LEFT JOIN medicines m ON pi.medicine_id = m.id
       WHERE pi.purchase_id = $1`,
      [parsedId]
    );

    return NextResponse.json({
      success: true,
      data: {
        ...purchaseResult.rows[0],
        items: itemsResult.rows,
      },
    });
  } catch (error) {
    console.error('Error fetching purchase:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch purchase' },
      { status: 500 }
    );
  }
}

// DELETE /api/pharmacy/purchases/[id] – delete a purchase (and adjust stock)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    // Check if purchase exists
    const existing = await query('SELECT id FROM purchases WHERE id = $1', [parsedId]);
    if (existing.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Purchase not found' }, { status: 404 });
    }

    // Start transaction
    await transaction(async (client) => {
      // 1. Revert stock for all items
      const items = await client.query(
        'SELECT medicine_id, batch_no, quantity FROM purchase_items WHERE purchase_id = $1',
        [parsedId]
      );
      for (const item of items.rows) {
        await client.query(
          `UPDATE stock 
           SET quantity = quantity - $1
           WHERE medicine_id = $2 AND batch_no = $3`,
          [item.quantity, item.medicine_id, item.batch_no]
        );
      }

      // 2. Delete purchase items (cascade via ON DELETE CASCADE if set)
      await client.query('DELETE FROM purchase_items WHERE purchase_id = $1', [parsedId]);

      // 3. Delete purchase header
      await client.query('DELETE FROM purchases WHERE id = $1', [parsedId]);
    });

    return NextResponse.json({
      success: true,
      message: 'Purchase deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting purchase:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete purchase' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();
    const validation = PurchaseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check if purchase exists
    const existing = await query('SELECT id FROM purchases WHERE id = $1', [parsedId]);
    if (existing.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Purchase not found' }, { status: 404 });
    }

    // Start transaction
    await transaction(async (client) => {
      // 1. Revert stock for existing items (subtract quantities)
      const oldItems = await client.query(
        'SELECT medicine_id, batch_no, quantity FROM purchase_items WHERE purchase_id = $1',
        [parsedId]
      );
      for (const item of oldItems.rows) {
        await client.query(
          `UPDATE stock 
           SET quantity = quantity - $1
           WHERE medicine_id = $2 AND batch_no = $3`,
          [item.quantity, item.medicine_id, item.batch_no]
        );
      }

      // 2. Delete old purchase items
      await client.query('DELETE FROM purchase_items WHERE purchase_id = $1', [parsedId]);

      // 3. Update purchase header
      await client.query(
        `UPDATE purchases 
         SET supplier_id = $1, invoice_no = $2, invoice_date = $3, gst_no = $4, 
             payment_mode = $5, subtotal = $6, tax_total = $7, grand_total = $8,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $9`,
        [
          data.supplierId,
          data.invoiceNo,
          data.invoiceDate,
          data.gstNo || null,
          data.paymentMode,
          data.subtotal,
          data.taxTotal,
          data.grandTotal,
          parsedId,
        ]
      );

      // 4. Insert new items and update stock
      for (const item of data.items) {
        await client.query(
          `INSERT INTO purchase_items 
           (purchase_id, medicine_id, batch_no, expiry_date, quantity, purchase_price, mrp, tax_percent, total)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            parsedId,
            item.medicineId,
            item.batch,
            item.expiryDate,
            item.qty,
            item.purchasePrice,
            item.mrp,
            item.taxPercent,
            item.total,
          ]
        );

        await client.query(
          `INSERT INTO stock (medicine_id, batch_no, expiry_date, quantity, purchase_price, mrp)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (medicine_id, batch_no) DO UPDATE
           SET quantity = stock.quantity + EXCLUDED.quantity,
               purchase_price = EXCLUDED.purchase_price,
               mrp = EXCLUDED.mrp,
               updated_at = CURRENT_TIMESTAMP`,
          [
            item.medicineId,
            item.batch,
            item.expiryDate,
            item.qty,
            item.purchasePrice,
            item.mrp,
          ]
        );
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Purchase updated successfully',
      data: { id: parsedId },
    });
  } catch (error) {
    console.error('Error updating purchase:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update purchase' },
      { status: 500 }
    );
  }
}


// PATCH /api/pharmacy/purchases/[id] – update is_delivered
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;
//     const parsedId = parseInt(id);
//     if (isNaN(parsedId)) {
//       return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
//     }

//     const body = await req.json();
//     const { isDelivered } = body;

//     if (typeof isDelivered !== 'boolean') {
//       return NextResponse.json({ success: false, message: 'isDelivered must be a boolean' }, { status: 400 });
//     }

//     const result = await query(
//       'UPDATE purchases SET is_delivered = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id',
//       [isDelivered, parsedId]
//     );

//     if (result.rows.length === 0) {
//       return NextResponse.json({ success: false, message: 'Purchase not found' }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, message: 'Delivery status updated' });
//   } catch (error) {
//     console.error('Error updating purchase delivery status:', error);
//     return NextResponse.json(
//       { success: false, message: 'Failed to update' },
//       { status: 500 }
//     );
//   }
// }

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }

    const body = await req.json();
    const { isDelivered } = body;
    if (typeof isDelivered !== 'boolean') {
      return NextResponse.json({ success: false, message: 'isDelivered must be a boolean' }, { status: 400 });
    }

    // Get current purchase state
    const purchaseCheck = await query(
      'SELECT stock_updated FROM purchases WHERE id = $1',
      [parsedId]
    );
    if (purchaseCheck.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Purchase not found' }, { status: 404 });
    }
    const wasStockUpdated = purchaseCheck.rows[0].stock_updated;

    // If we are setting delivered = true and stock was not updated yet
    if (isDelivered && !wasStockUpdated) {
      // Update stock for each item
      await transaction(async (client) => {
        // Get items for this purchase
        const items = await client.query(
          'SELECT medicine_id, batch_no, expiry_date, quantity, purchase_price, mrp FROM purchase_items WHERE purchase_id = $1',
          [parsedId]
        );

        for (const item of items.rows) {
          await client.query(
            `INSERT INTO stock (medicine_id, batch_no, expiry_date, quantity, purchase_price, mrp)
             VALUES ($1, $2, $3, $4, $5, $6)
             ON CONFLICT (medicine_id, batch_no) DO UPDATE
             SET quantity = stock.quantity + EXCLUDED.quantity,
                 purchase_price = EXCLUDED.purchase_price,
                 mrp = EXCLUDED.mrp,
                 updated_at = CURRENT_TIMESTAMP`,
            [
              item.medicine_id,
              item.batch_no,
              item.expiry_date,
              item.quantity,
              item.purchase_price,
              item.mrp,
            ]
          );
        }

        // Mark stock_updated = true and set is_delivered = true
        await client.query(
          'UPDATE purchases SET is_delivered = true, stock_updated = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
          [parsedId]
        );
      });
    }
    // If we are setting delivered = false (un‑deliver) and stock was previously updated
    else if (!isDelivered && wasStockUpdated) {
      // Attempt to revert stock – this is risky because stock may have been sold.
      // We'll only allow if the full quantity is still present (no sales).
      await transaction(async (client) => {
        // Get items
        const items = await client.query(
          'SELECT medicine_id, batch_no, quantity FROM purchase_items WHERE purchase_id = $1',
          [parsedId]
        );

        for (const item of items.rows) {
          // Check current stock for this batch
          const stockCheck = await client.query(
            'SELECT quantity FROM stock WHERE medicine_id = $1 AND batch_no = $2',
            [item.medicine_id, item.batch_no]
          );
          if (stockCheck.rows.length === 0) {
            throw new Error(`Stock record missing for batch ${item.batch_no} – cannot revert`);
          }
          const currentQty = stockCheck.rows[0].quantity;
          if (currentQty < item.quantity) {
            throw new Error(`Insufficient stock to revert batch ${item.batch_no} (some may have been sold)`);
          }
        }

        // Now subtract quantities
        for (const item of items.rows) {
          await client.query(
            `UPDATE stock 
             SET quantity = quantity - $1, updated_at = CURRENT_TIMESTAMP
             WHERE medicine_id = $2 AND batch_no = $3`,
            [item.quantity, item.medicine_id, item.batch_no]
          );
        }

        // Update purchase record
        await client.query(
          'UPDATE purchases SET is_delivered = false, stock_updated = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
          [parsedId]
        );
      });
    } else {
      // Simple toggle without stock change (e.g., toggling false when stock_updated already false)
      await query(
        'UPDATE purchases SET is_delivered = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
        [isDelivered, parsedId]
      );
    }

    return NextResponse.json({ success: true, message: 'Delivery status updated' });
  } catch (error: any) {
    console.error('Error updating delivery status:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update' },
      { status: 500 }
    );
  }
}