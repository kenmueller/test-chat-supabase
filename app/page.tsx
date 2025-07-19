import Link from 'next/link'
import createSupabaseServerClient from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { SignInModal } from './components/SignInModal'
import { SignUpModal } from './components/SignUpModal'
import { signout } from './login/actions'

export default async function Home() {
	const supabase = await createSupabaseServerClient()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (user) {
		return (
			<div className="flex min-h-screen flex-col items-center justify-center p-24">
				<div className="w-full max-w-2xl space-y-8 text-center">
					<h1 className="text-4xl font-bold tracking-tight">
						Ken Chat
					</h1>
					<p className="text-lg text-muted-foreground">
						Welcome back, <strong>{user.email}</strong>
					</p>
					<div className="flex space-x-4 justify-center">
						<Button asChild>
							<Link href="/private">Go to Private Page</Link>
						</Button>
						<form action={signout} className="inline">
							<Button type="submit" variant="outline">
								Sign out
							</Button>
						</form>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<div className="w-full max-w-md space-y-8 text-center">
				<h1 className="text-4xl font-bold tracking-tight">Ken Chat</h1>

				<div className="flex flex-col space-y-4">
					<SignInModal>
						<Button className="w-full">Sign in</Button>
					</SignInModal>

					<SignUpModal>
						<Button variant="outline" className="w-full">
							Sign up
						</Button>
					</SignUpModal>
				</div>
			</div>
		</div>
	)
}
