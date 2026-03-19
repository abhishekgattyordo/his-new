import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const dateParam = url.searchParams.get('date'); // expected format: YYYY-MM-DD

    // Use provided date or default to today
    const targetDate = dateParam || new Date().toISOString().split('T')[0];

    // Validate date format (simple regex)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(targetDate)) {
      return NextResponse.json(
        { success: false, message: 'Invalid date format. Use YYYY-MM-DD.' },
        { status: 400 }
      );
    }

    // Adjust column names to match your actual schema:
    // - For doctor name: concatenate first_name and last_name (or use full_name if that column exists)
    // - For specialization: use 'specialty' (as seen in your mapping)
    const sql = `
      SELECT 
        a.id AS appointment_id,
        a.appointment_date,
        a.appointment_time,
        a.consultation_type,
        a.status,
        a.notes,
        a.doctor_id,
        -- Concatenate first and last name (adjust column names if needed)
        CONCAT(d.first_name, ' ', d.last_name) AS doctor_name,
        d.specialty AS doctor_specialization,
        p.patient_id,
        p.full_name_en AS patient_name,
        p.dob AS patient_dob,
        p.gender AS patient_gender,
        p.phone AS patient_phone,
        p.email AS patient_email,
        p.blood_group
      FROM appointments a
      LEFT JOIN patients p ON a.patient_id = p.patient_id
      LEFT JOIN doctors d ON a.doctor_id = d.id
      WHERE a.appointment_date = $1::date
      ORDER BY a.appointment_time ASC
    `;

    const result = await query(sql, [targetDate]);

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error('Error fetching appointments by date:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}