import type { Get, Paths } from './utilTypes';

export function getDeep<T, P extends Paths<T>>(obj: T, key: P): Get<T, P> {
	const parts = key.split('.');

	// @ts-ignore
	return parts.reduce((obj, p) => obj[p], obj);
}

export function setDeep<T, P extends Paths<T>, V extends Get<T, P>>(obj: T, key: P, val: V) {
	const parts = key.split('.');

	let cur: any = obj;
	for (let i = 0; i < parts.length - 1; i++) {
		// @ts-ignore
		cur = obj[parts[i]];
	}

	cur[parts.at(-1)!] = val;
}