import { z } from 'zod';

export const resetPasswordSchema = z
    .object({
        oldPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
            .string()
            .min(8, 'Password must be at least 8 characters long.')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
            .regex(/\d/, 'Password must contain at least one number.'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
    });

export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
