import { z } from 'zod';

export const PrescriptionItemSchema = z.object({
  medicineId: z.number().int().positive(),
  prescribedQty: z.number().int().positive(),
  dispensedQty: z.number().int().min(0).default(0),
  instructions: z.string().optional(),
});

export const PrescriptionSchema = z.object({
  patientId: z.string(), // patient_id as string (bigint)
  doctorId: z.number().int().positive(),
  consultationId: z.string().min(1),
  prescriptionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().optional(),
  items: z.array(PrescriptionItemSchema).min(1),
});

export const DispenseSchema = z.object({
  prescriptionId: z.number().int().positive(),
  items: z.array(
    z.object({
      medicineId: z.number().int().positive(),
      dispensedQty: z.number().int().positive(),
    })
  ).min(1),
});

export type PrescriptionInput = z.infer<typeof PrescriptionSchema>;
export type DispenseInput = z.infer<typeof DispenseSchema>;