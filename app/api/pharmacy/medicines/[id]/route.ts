import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { MedicineUpdateSchema } from '@/lib/validations/medicine';

// GET /api/pharmacy/medicines/[id] – fetch one medicine
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

    const result = await query('SELECT * FROM medicines WHERE id = $1', [parsedId]);

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Medicine not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error fetching medicine:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch medicine' }, { status: 500 });
  }
}

// PUT /api/pharmacy/medicines/[id] – update a medicine
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
    const validation = MedicineUpdateSchema.safeParse({ ...body, id: parsedId });
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
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    const fields: (keyof typeof data)[] = [
      'name',
      'genericName',
      'brandName',
      'category',
      'unit',
      'purchasePrice',
      'sellingPrice',
      'mrp',
      'taxPercent',
      'isActive',
    ];

    fields.forEach((field) => {
      if (data[field] !== undefined) {
        const column = field.replace(/([A-Z])/g, '_$1').toLowerCase();
        updates.push(`${column} = $${paramIndex}`);
        values.push(data[field]);
        paramIndex++;
      }
    });

    if (updates.length === 0) {
      return NextResponse.json({ success: false, message: 'No fields to update' }, { status: 400 });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(parsedId);
    const queryStr = `UPDATE medicines SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await query(queryStr, values);

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Medicine not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Medicine updated successfully',
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating medicine:', error);
    return NextResponse.json({ success: false, message: 'Failed to update medicine' }, { status: 500 });
  }
}

// DELETE /api/pharmacy/medicines/[id] – soft delete a medicine
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

    const result = await query(
      'UPDATE medicines SET is_active = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING id',
      [parsedId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Medicine not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Error deleting medicine:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete medicine' }, { status: 500 });
  }
}