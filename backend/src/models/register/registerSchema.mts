import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    email: z.email("Invalid email address")
})

export type RegisterInput = z.infer<typeof registerSchema>;

