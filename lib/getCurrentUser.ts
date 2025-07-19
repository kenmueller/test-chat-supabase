import createSupabaseServerClient from './supabase/server'

const getCurrentUser = async () => {
	const supabase = await createSupabaseServerClient()

	const {
		data: { user }
	} = await supabase.auth.getUser()

	if (!user) return null

	const username = user.user_metadata?.username

	if (!(typeof username === 'string' && username)) {
		return null
	}

	return { username }
}

export default getCurrentUser
