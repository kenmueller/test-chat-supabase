import createSupabaseServerClient from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/app/(home)/actions'
import { Button } from '@/components/ui/button'

const MessagesPage = async () => {
	const supabase = await createSupabaseServerClient()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) redirect('/')

	const username = user.user_metadata?.username

	if (!(typeof username === 'string' && username)) {
		redirect(
			`/error?${new URLSearchParams({ message: 'Missing username' })}`
		)
	}

	const handleSignOut = async () => {
		'use server'
		await signOut()
		redirect('/')
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="w-full max-w-md space-y-8 text-center">
				<h1 className="text-4xl font-bold tracking-tight">
					Hello, {username}!
				</h1>
				<form action={handleSignOut}>
					<Button type="submit" variant="outline" className="w-full">
						Sign Out
					</Button>
				</form>
			</div>
		</div>
	)
}

export default MessagesPage
