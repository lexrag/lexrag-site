import { z } from 'zod';

export const getPasswordSchema = (minLength = 8) => {
    return z
        .string()
        .min(minLength, {
            message: `Password must be at least ${minLength} characters long.`,
        })
        .regex(/[a-z]/, {
            message: 'Password must contain at least one lowercase letter.',
        })
        .regex(/\d/, {
            message: 'Password must contain at least one number.',
        });
};
