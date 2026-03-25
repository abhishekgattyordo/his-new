// import { NextResponse } from 'next/server';
// import { query } from '@/lib/db';

// export async function GET() {
//   try {
//     const result = await query('SELECT NOW() as time');
//     return NextResponse.json({
//       success: true,
//       message: 'Database connected',
//       timestamp: result.rows[0].time
//     });
//   } catch (error) {
//     console.error('DB connection error:', error);
//     return NextResponse.json(
//       { success: false, message: 'Database connection failed', error: String(error) },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Test connection and get current timestamp
    const timeResult = await query('SELECT NOW() as now');
    
    // Try to count appointments (optional, to check table existence)
    const countResult = await query('SELECT COUNT(*) FROM appointments');
    
    return NextResponse.json({
      success: true,
      timestamp: timeResult.rows[0].now,
      appointmentCount: countResult.rows[0].count
    });
  } catch (error: any) {
    console.error('DB test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      hint: error.hint || null
    }, { status: 500 });
  }
}