import { isTagged, tag, type Tagged } from '$lib/utils';

export const DERIVE_SYMBOL = Symbol('derive');

export type Derive<C, R = number> = Tagged<(char: C) => R, typeof DERIVE_SYMBOL>;

export function derive<C, R>(func: (char: C) => R): Derive<C, R> {
	return tag(DERIVE_SYMBOL, func);
}

export function isDerive(instance: unknown): instance is Derive<unknown, unknown> {
	return isTagged(instance, DERIVE_SYMBOL);
}
