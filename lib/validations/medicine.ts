import { z } from 'zod';

export const MedicineSchema = z.object({
  name: z.string().min(1, 'Medicine name is required'),
  genericName: z.string().optional().nullable(),
  brandName: z.string().optional().nullable(),
  category: z.string().min(1, 'Category is required'),
  unit: z.string().min(1, 'Unit is required'),
  purchasePrice: z.number().positive('Purchase price must be positive'),
  sellingPrice: z.number().positive('Selling price must be positive'),
  mrp: z.number().positive().optional().nullable(),
  taxPercent: z.number().min(0, 'Tax percent cannot be negative').optional().nullable(),
    isActive: z.boolean().optional().default(true),
});

export const MedicineUpdateSchema = MedicineSchema.partial().extend({
  id: z.number().int().positive(),
});

export type MedicineInput = z.infer<typeof MedicineSchema>;
export type MedicineUpdateInput = z.infer<typeof MedicineUpdateSchema>;