import { createBrowserClient } from '@supabase/ssr'

const createSupabaseBrowserClient = () =>
	createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

export default createSupabaseBrowserClient
