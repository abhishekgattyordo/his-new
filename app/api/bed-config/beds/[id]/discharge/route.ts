import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

const DischargeSchema = z.object({
  dischargeNotes: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('📥 POST /api/bed-config/beds/[id]/discharge - Starting request');
  
  try {
    const { id } = await params;
    const bedId = parseInt(id);
    
    if (isNaN(bedId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid bed ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    console.log('📦 Request body:', JSON.stringify(body, null, 2));

    const validation = DischargeSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { dischargeNotes } = validation.data;

    // Check if bed exists and is occupied
    const bedCheck = await query(
      'SELECT status, attributes FROM beds WHERE id = $1',
      [bedId]
    );

    if (bedCheck.rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Bed not found' },
        { status: 404 }
      );
    }

    if (bedCheck.rows[0].status !== 'occupied') {
      return NextResponse.json(
        { success: false, message: 'Bed is not occupied' },
        { status: 400 }
      );
    }

    const bed = bedCheck.rows[0];
    const currentAttributes = bed.attributes || {};
    
    // Get current patient info before clearing
    const dischargedPatient = currentAttributes.currentPatient;
    
    // Update patient history
    const updatedPatientHistory = [
      ...(currentAttributes.patientHistory || []).map((p: any) => 
        p.patientId === dischargedPatient?.id 
          ? { ...p, dischargeDate: new Date().toISOString().split('T')[0], notes: dischargeNotes }
          : p
      )
    ];

    // Update bed - clear current patient and set to cleaning
    const updatedAttributes = {
      ...currentAttributes,
      currentPatient: null,
      patientHistory: updatedPatientHistory,
      lastDischarge: {
        date: new Date().toISOString().split('T')[0],
        patient: dischargedPatient,
        notes: dischargeNotes
      }
    };

    const updateResult = await query(
      `UPDATE beds 
       SET status = 'cleaning',
           attributes = $1::jsonb,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2
       RETURNING *`,
      [JSON.stringify(updatedAttributes), bedId]
    );

    return NextResponse.json({
      success: true,
      message: 'Patient discharged successfully',
      data: updateResult.rows[0]
    });

  } catch (error) {
    console.error('Error discharging patient:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to discharge patient' },
      { status: 500 }
    );
  }
}