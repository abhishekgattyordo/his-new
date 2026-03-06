import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

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
    const { deliveredManual } = body;

    if (deliveredManual === undefined || typeof deliveredManual !== 'number' || deliveredManual < 0) {
      return NextResponse.json({ success: false, message: 'Invalid delivered quantity' }, { status: 400 });
    }

    const result = await query(
      `UPDATE stock 
       SET delivered_manual = $1, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING id`,
      [deliveredManual, parsedId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Stock item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Delivered quantity updated' });
  } catch (error) {
    console.error('Error updating stock:', error);
    return NextResponse.json({ success: false, message: 'Failed to update stock' }, { status: 500 });
  }
}