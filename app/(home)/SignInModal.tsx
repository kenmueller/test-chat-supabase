'use client'

import { ReactNode, useState, useCallback, FormEvent, useId } from 'react'
import { useRouter } from 'next/navigation'
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
import { signIn } from './actions'
import { signInSchema } from './schemas'
import clsx from 'clsx'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

const SignInModal = ({ children }: { children: ReactNode }) => {
	const router = useRouter()

	const emailId = useId()
	const passwordId = useId()

	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [submitError, setSubmitError] = useState<string | null>(null)

	const emailError =
		email && !signInSchema.shape.email.safeParse(email).success
			? 'Please enter a valid email address'
			: null

	const passwordError =
		password && !signInSchema.shape.password.safeParse(password).success
			? 'Password must be at least 6 characters'
			: null

	const isValid = email && password && !emailError && !passwordError

	const onSubmit = useCallback(
		async (event: FormEvent) => {
			event.preventDefault()
			if (!isValid) return

			try {
				setIsLoading(true)

				await signIn({ email, password })

				router.push('/messages')
			} catch (error) {
				setSubmitError(
					error instanceof Error ? error.message : 'Unknown error'
				)
			} finally {
				setIsLoading(false)
			}
		},
		[email, password, isValid, router]
	)

	const onIsOpenChange = useCallback(
		(newIsOpen: boolean) => {
			if (!isLoading) {
				setIsOpen(newIsOpen)

				if (!newIsOpen) {
					// Reset form when closing

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
					<DialogTitle>Sign In</DialogTitle>
				</DialogHeader>
				<form onSubmit={onSubmit} className="space-y-4">
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
							{isLoading ? <Spinner /> : 'Sign in'}
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
							Sign in with Google
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default SignInModal
