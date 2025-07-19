'use client'

import { ReactNode, useState, useCallback, FormEvent, useId } from 'react'
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
import { signUp } from './actions'
import { signUpSchema } from './schemas'
import clsx from 'clsx'
import { redirect } from 'next/navigation'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

const SignUpModal = ({ children }: { children: ReactNode }) => {
	const usernameId = useId()
	const emailId = useId()
	const passwordId = useId()

	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [submitError, setSubmitError] = useState<string | null>(null)

	const usernameError =
		username && !signUpSchema.shape.username.safeParse(username).success
			? 'Username is required'
			: null

	const emailError =
		email && !signUpSchema.shape.email.safeParse(email).success
			? 'Please enter a valid email address'
			: null

	const passwordError =
		password && !signUpSchema.shape.password.safeParse(password).success
			? 'Password must be at least 6 characters'
			: null

	const isValid =
		username &&
		email &&
		password &&
		!usernameError &&
		!emailError &&
		!passwordError

	const onSubmit = useCallback(
		async (event: FormEvent) => {
			event.preventDefault()
			if (!isValid) return

			try {
				setIsLoading(true)
				setSubmitError(null)

				await signUp({ username, email, password })

				redirect('/messages')
			} catch (error) {
				setSubmitError(
					error instanceof Error ? error.message : 'Unknown error'
				)
			} finally {
				setIsLoading(false)
			}
		},
		[username, email, password, isValid]
	)

	const onIsOpenChange = useCallback(
		(newIsOpen: boolean) => {
			if (!isLoading) {
				setIsOpen(newIsOpen)

				if (!newIsOpen) {
					// Reset form when closing

					setUsername('')
					setEmail('')
					setPassword('')
					setSubmitError(null)
				}
			}
		},
		[isLoading]
	)

	return (
		<Dialog open={isOpen} onOpenChange={onIsOpenChange}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Sign Up</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor={usernameId}>Username</Label>
						<Input
							id={usernameId}
							name="username"
							type="text"
							placeholder="Enter your username"
							value={username}
							onChange={event => {
								setUsername(event.target.value)
							}}
							className={clsx(
								usernameError &&
									'border-red-500 focus:ring-red-500'
							)}
							required
							disabled={isLoading}
						/>
						{usernameError && (
							<p className="text-sm text-red-500">
								{usernameError}
							</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor={emailId}>Email</Label>
						<Input
							id={emailId}
							name="email"
							type="email"
							placeholder="Enter your email"
							value={email}
							onChange={event => {
								setEmail(event.target.value)
							}}
							className={clsx(
								emailError &&
									'border-red-500 focus:ring-red-500'
							)}
							required
							disabled={isLoading}
						/>
						{emailError && (
							<p className="text-sm text-red-500">{emailError}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor={passwordId}>Password</Label>
						<Input
							id={passwordId}
							name="password"
							type="password"
							placeholder="Enter your password"
							value={password}
							onChange={event => {
								setPassword(event.target.value)
							}}
							className={clsx(
								passwordError &&
									'border-red-500 focus:ring-red-500'
							)}
							required
							disabled={isLoading}
						/>
						{passwordError && (
							<p className="text-sm text-red-500">
								{passwordError}
							</p>
						)}
					</div>
					<div className="space-y-3">
						<Button
							type="submit"
							className={clsx(
								'w-full transition-all duration-200',
								!isValid || isLoading
									? 'opacity-50 cursor-not-allowed'
									: 'hover:opacity-90'
							)}
							disabled={!isValid || isLoading}
						>
							{isLoading ? <Spinner /> : 'Sign Up'}
						</Button>
						{submitError && (
							<p className="text-sm text-red-500 text-center">
								{submitError}
							</p>
						)}
						<Button
							type="button"
							variant="outline"
							className="w-full"
							disabled={isLoading}
						>
							Sign up with Google
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default SignUpModal
