import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import { ReactNode } from 'react'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export const metadata: Metadata = {
	title: 'Ken Chat',
	description: 'Ken Chat built with Supabase, Next.js, and shadcn/ui'
}

const RootLayout = ({ children }: { children: ReactNode }) => (
	<html lang="en">
		<body
			className={clsx(
				geistSans.variable,
				geistMono.variable,
				'antialiased min-h-screen bg-background font-sans'
			)}
		>
			{children}
		</body>
	</html>
)

export default RootLayout
