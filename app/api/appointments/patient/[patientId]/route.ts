// // import { NextResponse } from "next/server";
// // import { query } from "@/lib/db";

// // export async function GET(
// //   req: Request,
// //   { params }: { params: Promise<{ patientId: string }> }
// // ) {
// //   try {
// //     const { patientId } = await params;
    
// //     console.log("📡 Fetching appointments for patient:", patientId);

// //     const result = await query(
// //       `SELECT 
// //         a.id,
// //         a.appointment_date as date,
// //         a.appointment_time as time,
// //         a.consultation_type as type,
// //         a.status,
// //         a.notes,
// //         d.id as doctor_id,
// //         d.name as doctor_name,
// //         d.specialty as doctor_specialty,
// //         d.image_url as doctor_image,
// //         d.consultation_fee as fee
// //       FROM appointments a
// //       JOIN doctors d ON a.doctor_id = d.id
// //       WHERE a.patient_id = $1
// //       ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
// //       [patientId]
// //     );

// //     console.log(`✅ Found ${result.rows.length} appointments for patient ${patientId}`);

// //     return NextResponse.json({
// //       success: true,
// //       data: result.rows
// //     });
// //   } catch (error) {
// //     console.error("❌ Error fetching patient appointments:", error);
// //     return NextResponse.json(
// //       { success: false, message: "Failed to fetch appointments" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import { query } from "@/lib/db";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ patientId: string }> }
// ) {
//   try {
//     const { patientId } = await params;
    
//     console.log("📡 Fetching appointments for patient:", patientId);

//     const result = await query(
//       `SELECT 
//         a.id,
//         a.appointment_date as date,
//         a.appointment_time as time,
//         a.consultation_type as type,
//         a.status,
//         a.notes,
//         d.id as doctor_id,
//         CONCAT('Dr. ', d.first_name, ' ', d.last_name) as doctor_name,
//         d.specialty as doctor_specialty,
//         d.avatar as doctor_image,
//         d.consultation_fee as fee
//       FROM appointments a
//       JOIN doctors d ON a.doctor_id = d.id
//       WHERE a.patient_id = $1
//       ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
//       [patientId]
//     );

//     console.log(`✅ Found ${result.rows.length} appointments for patient ${patientId}`);

//     // Format the data for frontend
//     const formattedAppointments = result.rows.map(row => ({
//       id: row.id,
//       date: row.date,
//       time: row.time,
//       type: row.type,
//       status: row.status || 'BOOKED',
//       notes: row.notes || '',
//       doctor_id: row.doctor_id.toString(),
//       doctor_name: row.doctor_name,
//       doctor_specialty: row.doctor_specialty,
//       doctor_image: row.doctor_image ? `http://localhost:3000${row.doctor_image}` : null,
//       fee: row.fee || 0
//     }));

//     return NextResponse.json({
//       success: true,
//       data: formattedAppointments
//     });
//   } catch (error) {
//     console.error("❌ Error fetching patient appointments:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch appointments" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ patientId: string }> }
) {
  try {
    const { patientId } = await params;
    
    console.log("📡 Fetching appointments for patient:", patientId);

    const result = await query(
      `SELECT 
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
      ORDER BY a.appointment_date DESC, a.appointment_time DESC`,
      [patientId]
    );

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