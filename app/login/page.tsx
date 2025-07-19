import { login, signup } from './actions'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl">
						Sign in to your account
					</CardTitle>
					<CardDescription>
						Enter your email and password to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-6">
						<div className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="email">Email address</Label>
								<Input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									placeholder="Enter your email"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="password">Password</Label>
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									placeholder="Enter your password"
								/>
							</div>
						</div>

						<div className="flex space-x-4">
							<Button formAction={login} className="flex-1">
								Sign in
							</Button>
							<Button
								formAction={signup}
								variant="outline"
								className="flex-1"
							>
								Sign up
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
