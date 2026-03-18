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

    // 1. Get doctor's availability for that weekday
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

    // 2. Generate all possible slots in HH:MM 24‑hour format
    const slots: string[] = [];
    const start = new Date(`1970-01-01T${availability.start_time}`);
    const end = new Date(`1970-01-01T${availability.end_time}`);
    const duration = availability.slot_duration_minutes;

    while (start < end) {
      const hours = start.getHours().toString().padStart(2, '0');
      const minutes = start.getMinutes().toString().padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
      start.setMinutes(start.getMinutes() + duration);
    }

    // 3. Fetch booked appointments (excluding cancelled/completed)
    const bookedRes = await query(
      `SELECT appointment_time
       FROM appointments
       WHERE doctor_id = $1
       AND appointment_date = $2
       AND status NOT IN ('CANCELLED', 'COMPLETED')`,
      [doctorId, date]
    );

    console.log("Booked rows:", bookedRes.rows);

    // 4. Convert booked times to HH:MM for comparison
    const bookedTimes = bookedRes.rows.map((r: any) => {
      const timeStr = r.appointment_time;
      console.log("Raw appointment_time:", timeStr);
      let hours, minutes;

      // If time is in HH:MM:SS format (e.g., '09:30:00')
      if (timeStr.match(/^\d{2}:\d{2}:\d{2}$/)) {
        [hours, minutes] = timeStr.split(':');
        return `${hours}:${minutes}`;
      }
      // If time is in HH:MM AM/PM format (e.g., '09:30 AM')
      else if (timeStr.includes('AM') || timeStr.includes('PM')) {
        const [time, modifier] = timeStr.split(' ');
        [hours, minutes] = time.split(':');
        if (modifier === 'PM' && hours !== '12') hours = String(parseInt(hours) + 12);
        if (modifier === 'AM' && hours === '12') hours = '00';
        return `${hours.padStart(2, '0')}:${minutes}`;
      }
      // Fallback: assume HH:MM
      else {
        [hours, minutes] = timeStr.split(':');
        return `${hours.padStart(2, '0')}:${minutes}`;
      }
    });

    console.log("Generated slots (HH:MM):", slots);
    console.log("Booked times (HH:MM):", bookedTimes);

    // 5. Filter out booked slots
    const availableSlots = slots.filter(slot => !bookedTimes.includes(slot));

    console.log("Available slots after filter:", availableSlots);

    return NextResponse.json({
      success: true,
      date,
      doctor_id: doctorId,
      slots: availableSlots,
    });
  } catch (error) {
    console.error("Get slots error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch slots" },
      { status: 500 }
    );
  }
}