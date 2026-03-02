import { z } from 'zod';

export const CreateDoctorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  department: z.string().min(1, 'Department is required'),
  licenseNumber: z.string().min(1, 'License number is required'),
  dateOfBirth: z.string().optional(),
  dateJoined: z.string().min(1, 'Date joined is required'),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  qualifications: z.array(z.string()).default([]),
  experience: z.preprocess(
    (val) => {
      if (val === '' || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().int().positive().optional()
  ),
  bio: z.string().optional(),
  status: z.enum(['active', 'on-leave', 'inactive']).default('active'),
});

export const UpdateDoctorSchema = CreateDoctorSchema.partial();

export type CreateDoctorInput = z.infer<typeof CreateDoctorSchema>;
export type UpdateDoctorInput = z.infer<typeof UpdateDoctorSchema>;