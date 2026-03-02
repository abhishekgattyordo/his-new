import { z } from 'zod';

// ==================== STEP 1 VALIDATION ====================

export const Step1Schema = z.object({
  step: z.literal(1),
  fullNameEn: z.string()
    .min(1, "Full name (English) is required")
    .max(100, "Full name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Full name can only contain letters and spaces"),
  
  fullNameHi: z.string()
    .max(100, "Hindi name must be less than 100 characters")
    .optional()
    .nullable(),
  
  dob: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const dob = new Date(date);
      return !isNaN(dob.getTime());
    }, "Invalid date format. Please use YYYY-MM-DD format")
    .refine((date) => {
      const dob = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dob.setHours(0, 0, 0, 0);
      return dob <= today;
    }, "Date of birth cannot be in the future"),
  
  gender: z.enum(['male', 'female', 'other', 'prefer_not_to_say']),
  
  address: z.string()
    .min(5, "Address must be at least 5 characters")
    .max(500, "Address must be less than 500 characters"),
  
  // New fields
  city: z.string()
    .max(100, "City name must be less than 100 characters")
    .optional()
    .nullable(),
  
  state: z.string()
    .min(2, "State name is required")
    .max(50, "State name must be less than 50 characters"),
  
  country: z.string()
    .max(100, "Country name must be less than 100 characters")
    .default('India'),

  pincode: z.string()
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^\d{6}$/, "Pincode must contain only digits"),
  
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?[0-9]{10,15}$/, "Invalid phone number format. Use digits only, optionally starting with +"),
  
  email: z.string()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  
  blood_group: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'])
    .optional()
    .nullable()
});

// ==================== STEP 2 VALIDATION ====================

// Custom transformer that accepts both string and number for patientId
export const patientIdSchema = z.union([
  z.string()
    .regex(/^\d+$/, "Patient ID must contain only digits")
    .transform(val => val), // Keep as string for large numbers
  z.number()
    .int("Patient ID must be an integer")
    .positive("Patient ID must be positive")
    .transform(val => val.toString())
]).refine(val => val.length > 0 && val.length <= 30, {
  message: "Patient ID must be between 1 and 30 digits"
});

export const Step2Schema = z.object({
  step: z.literal(2),
  patientId: patientIdSchema,
  
  allergies: z.array(
    z.string()
      .max(100, "Allergy name must be less than 100 characters")
  ).default([]),
  
  chronicConditions: z.array(
    z.string()
      .max(100, "Chronic condition must be less than 100 characters")
  ).default([]),
  
  medications: z.string()
    .max(1000, "Medications description must be less than 1000 characters")
    .optional()
    .nullable()
    .default('')
});

// ==================== STEP 3 VALIDATION ====================

export const Step3Schema = z.object({
  step: z.literal(3),
  patientId: patientIdSchema,
  
  insuranceProvider: z.string()
    .max(100, "Insurance provider name must be less than 100 characters")
    .optional()
    .nullable(),
  
  policyNumber: z.string()
    .max(50, "Policy number must be less than 50 characters")
    .optional()
    .nullable(),
  
  validUntil: z.string()
    .optional()
    .nullable()
    .refine((date) => {
      if (!date) return true;
      const validDate = new Date(date);
      return !isNaN(validDate.getTime());
    }, "Invalid date format. Please use YYYY-MM-DD format")
    .refine((date) => {
      if (!date) return true;
      const validDate = new Date(date);
      const today = new Date();
      return validDate > today;
    }, "Valid until date must be in the future"),
  
  groupId: z.string()
    .max(50, "Group ID must be less than 50 characters")
    .optional()
    .nullable()
});

// ==================== EXPORT TYPES ====================

export type Step1Input = z.infer<typeof Step1Schema>;
export type Step2Input = z.infer<typeof Step2Schema>;
export type Step3Input = z.infer<typeof Step3Schema>;