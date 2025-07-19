type ServerAction<Args extends unknown[], Return> = (
	...args: Args
) => Promise<
	{ success: true; value: Return } | { success: false; error: string }
>

export default ServerAction
