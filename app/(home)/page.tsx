import createSupabaseServerClient from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import SignInModal from './SignInModal'
import SignUpModal from './SignUpModal'
import { redirect } from 'next/navigation'

const Home = async () => {
	const supabase = await createSupabaseServerClient()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (user) redirect('/messages')

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
export default Home
