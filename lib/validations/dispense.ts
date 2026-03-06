import { z } from 'zod';

export const DispenseItemSchema = z.object({
  medicineId: z.number(),
  quantity: z.number().positive('Quantity must be positive'),
  unitPrice: z.number(),
  taxPercent: z.number(),
});

export const DispenseSchema = z.object({
  prescriptionId: z.string(),
  patientId: z.string().optional(),
  walkinName: z.string().nullable().optional(),
  walkinPhone: z.string().nullable().optional(),
  walkinAddress: z.string().nullable().optional(),
  doctorName: z.string().min(1, 'Doctor name is required'),
  saleDate: z.string(),
  subtotal: z.number(),
  taxTotal: z.number(),
  discountTotal: z.number(),
  grandTotal: z.number(),
  paymentMode: z.string(),
  items: z.array(DispenseItemSchema),
});

// Export TypeScript types for frontend use
export type DispenseItem = z.infer<typeof DispenseItemSchema>;
export type DispensePayload = z.infer<typeof DispenseSchema>;