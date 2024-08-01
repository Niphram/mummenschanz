export const TAG_SYMBOL = Symbol('tag');

export type Tagged<I, D> = I & { [TAG_SYMBOL]: D };

export function tag<I, D>(discriminator: D, instance: I) {
	const tagged = instance as Tagged<I, D>;

	tagged[TAG_SYMBOL] = discriminator;

	return tagged;
}

export function isTagged<I, D>(instance: I, discriminator: D): instance is Tagged<I, D> {
	return (instance as Tagged<I, D>)[TAG_SYMBOL] === discriminator;
}
