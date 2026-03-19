import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const { patientId } = await params;

    // Get date query parameter if present
    const url = new URL(req.url);
    const date = url.searchParams.get('date'); // expected format: YYYY-MM-DD

    console.log("📡 Fetching appointments for patient:", patientId, date ? `on date: ${date}` : '');

    // Build query dynamically
    let sql = `
      SELECT 
        a.id,
        a.appointment_date as date,
        a.appointment_time as time,
        a.consultation_type as type,
        a.status,
        a.notes,
        d.id as doctor_id,
        CONCAT(d.first_name, ' ', d.last_name) as doctor_name,
        d.specialty as doctor_specialty,
        d.avatar as doctor_image
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.patient_id = $1
    `;

    const values: any[] = [patientId];
    let paramIndex = 2;

    if (date) {
      // Validate date format (simple regex)
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return NextResponse.json(
          { success: false, message: 'Invalid date format. Use YYYY-MM-DD.' },
          { status: 400 }
        );
      }
      sql += ` AND a.appointment_date = $${paramIndex}::date`;
      values.push(date);
      paramIndex++;
    }

    sql += ` ORDER BY a.appointment_date DESC, a.appointment_time DESC`;

    const result = await query(sql, values);

    console.log(`✅ Found ${result.rows.length} appointments for patient ${patientId}`);

    return NextResponse.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error("❌ Error fetching patient appointments:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}