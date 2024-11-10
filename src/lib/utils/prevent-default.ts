export function preventDefault<E extends Event, Args extends Array<unknown>>(
	fn: ((event: E, ...args: Args) => void) | undefined,
) {
	if (!fn) return undefined;

	return (event: E, ...args: Args) => {
		event.preventDefault();
		fn(event, ...args);
	};
}
