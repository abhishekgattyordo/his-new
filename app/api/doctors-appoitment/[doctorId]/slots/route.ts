import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ doctorId: string }> }
) {
  try {
    const { doctorId } = await params;
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!doctorId || !date) {
      return NextResponse.json(
        { success: false, message: "doctorId and date required" },
        { status: 400 }
      );
    }

    // Get availability for that weekday
    const availabilityRes = await query(
      `SELECT day_of_week, start_time, end_time, slot_duration_minutes
       FROM doctor_availability
       WHERE doctor_id = $1`,
      [doctorId]
    );

    if (availabilityRes.rows.length === 0) {
      return NextResponse.json({
        success: true,
        slots: [],
        message: "No availability set",
      });
    }

    const inputDate = new Date(date);
    const dayOfWeek = inputDate.getDay();

    const availability = availabilityRes.rows.find(
      (row: any) => row.day_of_week === dayOfWeek
    );

    if (!availability) {
      return NextResponse.json({
        success: true,
        slots: [],
        message: "Doctor not available on this day",
      });
    }

    // Generate slots
    const slots: string[] = [];
    const start = new Date(`1970-01-01T${availability.start_time}`);
    const end = new Date(`1970-01-01T${availability.end_time}`);
    const duration = availability.slot_duration_minutes;

    while (start < end) {
      slots.push(
        start.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      start.setMinutes(start.getMinutes() + duration);
    }

    // Remove booked slots
    const bookedRes = await query(
      `SELECT appointment_time
       FROM appointments
       WHERE doctor_id = $1
       AND appointment_date = $2`,
      [doctorId, date]
    );

    const bookedTimes = bookedRes.rows.map(
      (r: any) =>
        new Date(`1970-01-01T${r.appointment_time}`)
          .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );

    const availableSlots = slots.filter(
      (slot) => !bookedTimes.includes(slot)
    );

    return NextResponse.json({
      success: true,
      date,
      doctor_id: doctorId,
      slots: availableSlots,
    });
  } catch (error) {
    console.error("Get slots error:", error);
    return NextResponse.json(
      { success: false, message: "Failed too  fetch slots" },
      { status: 500 }
    );
  }
}