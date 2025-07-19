'use server'

import createSupabaseServerClient from '@/lib/supabase/server'
import {
	SignInSchema,
	SignUpSchema,
	signInSchema,
	signUpSchema
} from './schemas'
import {
	createServerAction,
	ServerActionError
} from '@/lib/serverAction/server'

export const signIn = createServerAction(async (unsafeData: SignInSchema) => {
	const { data } = signInSchema.safeParse(unsafeData)
	if (!data) throw new ServerActionError('Invalid credentials')

	const supabase = await createSupabaseServerClient()

	const { error } = await supabase.auth.signInWithPassword(data)
	if (error) throw new ServerActionError(error)
})

export const signUp = createServerAction(async (unsafeData: SignUpSchema) => {
	const { data } = signUpSchema.safeParse(unsafeData)
	if (!data) throw new ServerActionError('Invalid credentials')

	const supabase = await createSupabaseServerClient()

	const { error } = await supabase.auth.signUp({
		email: data.email,
		password: data.password,
		options: { data: { username: data.username } }
	})

	if (error) throw new ServerActionError(error)
})

export const signOut = async () => {
	const supabase = await createSupabaseServerClient()

	const { error } = await supabase.auth.signOut()
	if (error) throw error
}
