import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'Name must start with a capital letter',
      }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .refine((value) => /^[A-Z]/.test(value), {
        message: 'Name must start with a capital letter',
      })
      .optional(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be string',
      })
      .min(6, { message: 'Password must be at least 6 characters long' })
      .optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
