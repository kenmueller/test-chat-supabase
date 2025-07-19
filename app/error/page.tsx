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

export default function ErrorPage() {
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
					<Alert variant="destructive">
						<AlertTriangle className="h-4 w-4" />
						<AlertTitle>Error Details</AlertTitle>
						<AlertDescription>
							This could be due to:
							<ul className="mt-2 space-y-1 text-sm list-disc list-inside">
								<li>Invalid login credentials</li>
								<li>Expired or invalid confirmation link</li>
								<li>Network connectivity issues</li>
								<li>Server configuration problems</li>
							</ul>
						</AlertDescription>
					</Alert>

					<div className="space-y-4">
						<Button asChild className="w-full">
							<Link href="/login">Try logging in again</Link>
						</Button>

						<Button asChild variant="outline" className="w-full">
							<Link href="/">Go back home</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
