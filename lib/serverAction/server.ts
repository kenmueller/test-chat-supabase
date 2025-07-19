import ServerAction from '.'

export class ServerActionError extends Error {
	constructor(error: Error | string) {
		super(error instanceof Error ? error.message : error)
	}
}

export const createServerAction =
	<Args extends unknown[], Return>(
		handler: (...args: Args) => Promise<Return>
	): ServerAction<Args, Return> =>
	async (...args: Args) => {
		try {
			return { success: true, value: await handler(...args) }
		} catch (error) {
			if (error instanceof ServerActionError) {
				return { success: false, error: error.message }
			}

			throw error
		}
	}
