
import * as z from 'zod';
export const SignupSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string()
});
export const SigninSchema = z.object({
    id: z.string(),
    password: z.string(),
    code: z.optional(z.string().length(8))
});

export const NoteConfigSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['FRONTEND', 'BACKEND', 'DEVELOPMENT', 'SCRIPTING']),
    tags: z.array(z.string())
})