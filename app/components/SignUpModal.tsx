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
import { signup } from '@/app/login/actions'

interface SignUpModalProps {
	children: React.ReactNode
}

export function SignUpModal({ children }: SignUpModalProps) {
	const [open, setOpen] = useState(false)

	const handleSubmit = async (formData: FormData) => {
		await signup(formData)
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Sign Up</DialogTitle>
				</DialogHeader>
				<form action={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="signup-username">Username</Label>
						<Input
							id="signup-username"
							name="username"
							type="text"
							placeholder="Enter your username"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="signup-email">Email</Label>
						<Input
							id="signup-email"
							name="email"
							type="email"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="signup-password">Password</Label>
						<Input
							id="signup-password"
							name="password"
							type="password"
							placeholder="Enter your password"
							required
						/>
					</div>
					<div className="space-y-3">
						<Button type="submit" className="w-full">
							Sign Up
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
