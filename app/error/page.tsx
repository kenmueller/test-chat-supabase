import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

const ErrorPage = async ({
	searchParams
}: {
	searchParams: Promise<{ message?: string }>
}) => {
	const { message } = await searchParams

	return (
		<div className="flex min-h-screen flex-col items-center justify-center p-24">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<CardTitle className="text-3xl">
						Oops! Something went wrong
					</CardTitle>
					<CardDescription>
						There was an error processing your request.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					{message && (
						<Alert variant="destructive">
							<AlertTriangle className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>{message}</AlertDescription>
						</Alert>
					)}
					<div className="space-y-4">
						<Button asChild variant="outline" className="w-full">
							<Link href="/">Go back home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

export default ErrorPage
