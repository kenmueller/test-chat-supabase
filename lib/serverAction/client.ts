import ServerAction from '.'

export const getServerAction =
	<Args extends unknown[], Return>(action: ServerAction<Args, Return>) =>
	async (...args: Args) => {
		const result = await action(...args)
		if (!result.success) throw new Error(result.error)

		return result.value
	}
