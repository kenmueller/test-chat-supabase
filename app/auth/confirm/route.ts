import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'
import { redirect } from 'next/navigation'

import createSupabaseServerClient from '@/lib/supabase/server'

export const GET = async (request: NextRequest) => {
	try {
		const { searchParams } = request.nextUrl

		const tokenHash = searchParams.get('token_hash')
		const type = searchParams.get('type') as EmailOtpType | null
		const next = searchParams.get('next') ?? '/'

		if (tokenHash && type) {
			const supabase = await createSupabaseServerClient()

			const { error } = await supabase.auth.verifyOtp({
				type,
				token_hash: tokenHash
			})

			if (error) throw error

			redirect(next)
		}
	} catch (error) {
		console.error('Email confirmation error:', error)

		redirect(
			`/error?${new URLSearchParams({ message: 'Email confirmation failed' })}`
		)
	}
}
