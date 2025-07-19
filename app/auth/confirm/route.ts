import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

import createSupabaseServerClient from '@/lib/supabase/server'
import { ServerActionError } from '@/lib/serverAction/server'

export const GET = async (request: NextRequest) => {
	try {
		const { searchParams } = request.nextUrl

		const tokenHash = searchParams.get('token_hash')
		const type = searchParams.get('type') as EmailOtpType | null
		const next = searchParams.get('next') ?? '/'

		if (!(tokenHash && type)) {
			throw new ServerActionError('Invalid request')
		}

		const supabase = await createSupabaseServerClient()

		const { error } = await supabase.auth.verifyOtp({
			type,
			token_hash: tokenHash
		})

		if (error) throw new ServerActionError(error)

		revalidatePath('/', 'layout')
		redirect(next)
	} catch (error) {
		if (error instanceof ServerActionError) {
			redirect(
				`/error?${new URLSearchParams({ message: error.message })}`
			)
		}

		throw error
	}
}
