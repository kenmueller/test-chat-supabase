import z from 'zod'

export const signInSchema = z.strictObject({
	email: z.email().trim(),
	password: z.string().trim().min(6)
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z.strictObject({
	name: z.string().trim().min(1),
	username: z.string().trim().min(1),
	email: z.email().trim(),
	password: z.string().trim().min(6)
})

export type SignUpSchema = z.infer<typeof signUpSchema>
