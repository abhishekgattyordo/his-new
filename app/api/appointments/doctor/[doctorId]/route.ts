


import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  try {
    const { doctorId } = await params;

    // Validate doctorId (must be numeric)
    if (!/^\d+$/.test(doctorId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid doctor ID format' },
        { status: 400 }
      );
    }

    const doctorIdNum = parseInt(doctorId);
    
    // Get date query parameter if present
    const url = new URL(req.url);
    const date = url.searchParams.get('date'); // e.g., "2026-03-13"

    // Build query dynamically – use LEFT JOIN to include appointments without patients
    let sql = `
      SELECT 
        a.id AS appointment_id,
        a.appointment_date,
        a.appointment_time,
        a.consultation_type,
        a.status,
        a.notes,
        p.patient_id,
        p.full_name_en AS patient_name,
        p.dob AS patient_dob,
        p.gender AS patient_gender,
        p.phone AS patient_phone,
        p.email AS patient_email,
        p.blood_group
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.patient_id
      WHERE a.doctor_id = $1
    `;
    const values: any[] = [doctorIdNum];
    let paramIndex = 2;

    if (date) {
      sql += ` AND a.appointment_date = $${paramIndex}::date`;
      values.push(date);
      paramIndex++;
    }

    sql += ` ORDER BY a.appointment_date DESC, a.appointment_time DESC`;

    const result = await query(sql, values);

    return NextResponse.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('Error fetching doctor appointments:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}