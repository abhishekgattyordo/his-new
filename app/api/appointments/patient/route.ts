import { NextResponse } from "next/server";
import { query } from "@/lib/db/index";

/* =====================================================
   📌 CREATE APPOINTMENT (POST)
===================================================== */
export async function POST(req: Request) {
  try {
    // ✅ Safe body parse
    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const {
      doctor_id,
      patient_id,
      appointment_date,
      appointment_time,
      consultation_type,
      notes,
    } = body;

    // ✅ Basic validation
    if (!doctor_id || !appointment_date || !appointment_time) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔒 Prevent double booking
    const existing = await query(
      `SELECT id FROM appointments
       WHERE doctor_id = $1
       AND appointment_date = $2
       AND appointment_time = $3`,
      [doctor_id, appointment_date, appointment_time]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        { success: false, message: "Slot already booked" },
        { status: 400 }
      );
    }

    // ✅ Insert appointment
    const result = await query(
      `INSERT INTO appointments 
       (doctor_id, patient_id, appointment_date, appointment_time, consultation_type, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        doctor_id,
        patient_id,
        appointment_date,
        appointment_time,
        consultation_type,
        notes,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Create appointment error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create appointment",
      },
      { status: 500 }
    );
  }
}

/* =====================================================
   📌 GET ALL APPOINTMENTS (GET)
===================================================== */
export async function GET() {
  try {
    const result = await query(`
      SELECT 
        a.*,
        d.name AS doctor_name,
        d.specialty
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.created_at DESC
    `);

    return NextResponse.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Fetch appointments error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}