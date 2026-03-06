import { z } from 'zod';

// Helper to convert empty string to undefined, then to number
const toNumber = (val: any) => {
  if (val === '' || val === null || val === undefined) return undefined;
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

export const SaleItemSchema = z.object({
  medicineId: z.preprocess(
    (val) => toNumber(val),
    z.number().int().positive()
  ),
  quantity: z.preprocess(
    (val) => toNumber(val),
    z.number().int().positive()
  ),
  unitPrice: z.preprocess(
    (val) => toNumber(val),
    z.number().positive()
  ),
  taxPercent: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return 0;
      const num = Number(val);
      return isNaN(num) ? 0 : num;
    },
    z.number().min(0).default(0)
  ),
});

export const SaleSchema = z.object({
  patientId: z.string().optional(),
  patientName: z.string().optional(),
  walkinName: z.string().optional(),
  walkinPhone: z.string().optional(),
  walkinAddress: z.string().optional(),
  doctorName: z.string().min(1, 'Doctor name is required'),
  saleDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  subtotal: z.preprocess(
    (val) => toNumber(val),
    z.number().positive()
  ),
  taxTotal: z.preprocess(
    (val) => toNumber(val),
    z.number().min(0)
  ),
  discountTotal: z.preprocess(
    (val) => toNumber(val),
    z.number().min(0).default(0)
  ),
  grandTotal: z.preprocess(
    (val) => toNumber(val),
    z.number().positive()
  ),
  paymentMode: z.string(),
  items: z.array(SaleItemSchema).min(1, 'At least one item is required'),
});

export type SaleInput = z.infer<typeof SaleSchema>;


// import { z } from 'zod';

// export const SaleSchema = z.object({
//   patientId: z.string().optional(),
//   patientName: z.string().optional(),
//   doctorName: z.string().min(1, 'Doctor name is required'),
//   walkinName: z.string().nullable().optional(),      // ← allows null
//   walkinPhone: z.string().nullable().optional(),     // ← allows null
//   walkinAddress: z.string().nullable().optional(),   // ← allows null
//   saleDate: z.string(),
//   subtotal: z.number(),
//   taxTotal: z.number(),
//   discountTotal: z.number(),
//   grandTotal: z.number(),
//   paymentMode: z.string(),
//   items: z.array(
//     z.object({
//       medicineId: z.number(),
//       quantity: z.number(),
//       unitPrice: z.number(),
//       taxPercent: z.number(),
//     })
//   ),
// });