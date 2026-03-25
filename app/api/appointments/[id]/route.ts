import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

async function appointmentExists(id: string): Promise<boolean> {
  const result = await query('SELECT 1 FROM appointments WHERE id = $1', [id]);
  return result.rows.length > 0;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const result = await query(
      `SELECT a.*, 
              CONCAT('Dr. ', d.first_name, ' ', d.last_name) as doctor_name,
              d.specialty as doctor_specialty, 
              p.full_name_en as patient_name
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       LEFT JOIN patients p ON a.patient_id = p.patient_id
       WHERE a.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/appointments/[id] – update an appointment
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Fields that can be updated (adjust to match your schema)
    const {
      appointment_date,
      appointment_time,
      consultation_type,
      status,
      notes,
      patient_id
    } = body;

    // Build dynamic update query (only include fields that are provided)
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (appointment_date !== undefined) {
      updates.push(`appointment_date = $${paramIndex++}`);
      values.push(appointment_date);
    }
    if (appointment_time !== undefined) {
      updates.push(`appointment_time = $${paramIndex++}`);
      values.push(appointment_time);
    }
    if (consultation_type !== undefined) {
      updates.push(`consultation_type = $${paramIndex++}`);
      values.push(consultation_type);
    }
    if (status !== undefined) {
      updates.push(`status = $${paramIndex++}`);
      values.push(status);
    }
    if (notes !== undefined) {
      updates.push(`notes = $${paramIndex++}`);
      values.push(notes);
    }
    if (patient_id !== undefined) {
      updates.push(`patient_id = $${paramIndex++}`);
      values.push(patient_id);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(id); // for WHERE clause
    const sql = `UPDATE appointments SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`;

    const result = await query(sql, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Appointment updated successfully'
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/appointments/[id] – delete or cancel an appointment
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

  
    const result = await query('DELETE FROM appointments WHERE id = $1 RETURNING id', [id]);

  

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}