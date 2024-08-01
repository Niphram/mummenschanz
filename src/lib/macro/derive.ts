import { isTagged, tag, type Tagged } from '$lib/utils';

export const DERIVE_SYMBOL = Symbol('derive');

export type Derive<C> = Tagged<(char: C) => number, typeof DERIVE_SYMBOL>;

export function derive<C>(func: (char: C) => number): Derive<C> {
	return tag(DERIVE_SYMBOL, func);
}

export function isDerive(instance: unknown): instance is Derive<unknown> {
	return isTagged(instance, DERIVE_SYMBOL);
}
