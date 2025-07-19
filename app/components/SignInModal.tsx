'use client'

import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/app/login/actions'

interface SignInModalProps {
	children: React.ReactNode
}

export function SignInModal({ children }: SignInModalProps) {
	const [open, setOpen] = useState(false)

	const handleSubmit = async (formData: FormData) => {
		await login(formData)
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Sign In</DialogTitle>
				</DialogHeader>
				<form action={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="signin-email">Email</Label>
						<Input
							id="signin-email"
							name="email"
							type="email"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="signin-password">Password</Label>
						<Input
							id="signin-password"
							name="password"
							type="password"
							placeholder="Enter your password"
							required
						/>
					</div>
					<div className="space-y-3">
						<Button type="submit" className="w-full">
							Sign In
						</Button>
						<Button
							type="button"
							variant="outline"
							className="w-full"
						>
							Sign in with Google
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}
