import { NextResponse } from "next/server";

/* ---------------- HARD CODED DATA ---------------- */

let appointments = [
  {
    id: 1,
    patientName: "Jane Smith",
    time: "09:30 AM",
    type: "Teleconsult",
    status: "Ready",
  },
  {
    id: 2,
    patientName: "Michael Brown",
    time: "10:00 AM",
    type: "In-Person",
    status: "Checked-in",
  },
];

/* ---------------- GET ALL APPOINTMENTS ---------------- */

export async function GET() {
  return NextResponse.json({
    success: true,
    data: appointments,
  });
}

/* ---------------- CREATE NEW APPOINTMENT ---------------- */

export async function POST(request: Request) {
  const body = await request.json();

  const newAppointment = {
    id: appointments.length + 1,
    ...body,
  };

  appointments.push(newAppointment);

  return NextResponse.json({
    success: true,
    message: "Appointment created",
    data: newAppointment,
  });
}
