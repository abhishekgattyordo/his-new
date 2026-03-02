import { NextRequest, NextResponse } from 'next/server';
import { query, transaction } from '@/lib/db';
import { z } from 'zod';

const TransferSchema = z.object({
  destinationBedId: z.number().int().positive(),
  reason: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log('📥 POST /api/bed-config/beds/[id]/transfer - Starting request');
  
  try {
    const { id } = await params;
    const sourceBedId = parseInt(id);
    
    if (isNaN(sourceBedId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid source bed ID' },
        { status: 400 }
      );
    }

    const body = await req.json();
    console.log('📦 Request body:', JSON.stringify(body, null, 2));

    const validation = TransferSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { destinationBedId, reason } = validation.data;

    // Use transaction to ensure data consistency
    const result = await transaction(async (client) => {
      // Check source bed exists and is occupied
      const sourceCheck = await client.query(
        'SELECT status, attributes FROM beds WHERE id = $1',
        [sourceBedId]
      );

      if (sourceCheck.rows.length === 0) {
        throw new Error('Source bed not found');
      }

      const sourceBed = sourceCheck.rows[0];
      console.log('Source bed:', sourceBed);

      if (sourceBed.status !== 'occupied') {
        throw new Error('Source bed is not occupied');
      }

      // Check destination bed exists and is available
      const destCheck = await client.query(
        'SELECT status, attributes FROM beds WHERE id = $1',
        [destinationBedId]
      );

      if (destCheck.rows.length === 0) {
        throw new Error('Destination bed not found');
      }

      if (destCheck.rows[0].status !== 'available') {
        throw new Error('Destination bed is not available');
      }

      // Get patient data from source bed attributes - LOOK FOR currentPatient
      const sourceAttributes = sourceBed.attributes || {};
      
      // Check for currentPatient (from your admit endpoint)
      const patientData = sourceAttributes.currentPatient;
      
      if (!patientData) {
        console.error('No patient data found in source bed. Attributes:', sourceAttributes);
        throw new Error('No patient data found in source bed');
      }

      console.log('Patient data to transfer:', patientData);

      // Get destination bed attributes
      const destAttributes = destCheck.rows[0].attributes || {};

      // Prepare destination bed attributes with patient data
      const updatedDestAttributes = {
        ...destAttributes,
        currentPatient: {
          ...patientData,
          transferDate: new Date().toISOString().split('T')[0],
          transferReason: reason || 'Clinical transfer',
          transferredFrom: sourceBedId
        },
        patientHistory: [
          ...(destAttributes.patientHistory || []),
          {
            patientId: patientData.id,
            name: patientData.name,
            mrn: patientData.mrn,
            admissionDate: patientData.admissionDate,
            transferDate: new Date().toISOString().split('T')[0],
            transferredFrom: sourceBedId
          }
        ]
      };

      // Clear source bed attributes
      const updatedSourceAttributes = {
        ...sourceAttributes,
        currentPatient: null,  // Clear the patient data
        patientHistory: [
          ...(sourceAttributes.patientHistory || []),
          {
            patientId: patientData.id,
            name: patientData.name,
            mrn: patientData.mrn,
            transferDate: new Date().toISOString().split('T')[0],
            transferredTo: destinationBedId,
            reason: reason || 'Clinical transfer'
          }
        ]
      };

      // Update source bed - set to cleaning
      await client.query(
        `UPDATE beds 
         SET status = 'cleaning',
             attributes = $1::jsonb,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [JSON.stringify(updatedSourceAttributes), sourceBedId]
      );
      console.log('Source bed updated to cleaning');

      // Update destination bed - set to occupied with patient data
      const destUpdate = await client.query(
        `UPDATE beds 
         SET status = 'occupied',
             attributes = $1::jsonb,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [JSON.stringify(updatedDestAttributes), destinationBedId]
      );
      console.log('Destination bed updated with patient data');

      return destUpdate.rows[0];
    });

    return NextResponse.json({
      success: true,
      message: 'Patient transferred successfully',
      data: result
    });

  } catch (error: any) {
    console.error('Error transferring patient:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to transfer patient' },
      { status: 500 }
    );
  }
}