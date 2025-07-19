'use server'

import { revalidatePath } from 'next/cache'
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

	revalidatePath('/', 'layout')
})

export const signUp = async (data: SignUpSchema) => {
	const { username, email, password } = signUpSchema.parse(data)

	const supabase = await createSupabaseServerClient()

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { username } }
	})

	if (error) throw error
}

export const signOut = async () => {
	const supabase = await createSupabaseServerClient()

	const { error } = await supabase.auth.signOut()
	if (error) throw error

	revalidatePath('/', 'layout')
}
