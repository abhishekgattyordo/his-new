import { z } from 'zod';

export const PurchaseItemSchema = z.object({
  medicineId: z.number().int().positive(),
  batch: z.string().min(1, 'Batch number is required'),
  expiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  qty: z.number().int().positive('Quantity must be positive'),
  purchasePrice: z.number().positive('Purchase price must be positive'),
  mrp: z.number().positive('MRP must be positive'),
  taxPercent: z.number().min(0, 'Tax cannot be negative').default(0),
  total: z.number().positive(),
});

export const PurchaseSchema = z.object({
  supplierId: z.number().int().positive(),
  invoiceNo: z.string().min(1, 'Invoice number is required'),
  invoiceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  gstNo: z.string().optional(),
  paymentMode: z.string(),
  subtotal: z.number().positive(),
  taxTotal: z.number().min(0),
  grandTotal: z.number().positive(),
  items: z.array(PurchaseItemSchema).min(1, 'At least one item is required'),
});

export type PurchaseInput = z.infer<typeof PurchaseSchema>;