import DeepProxy from 'proxy-deep';

import { isDerive, type Derive } from '$lib/macro/derive';
import { isMacro, type Macro } from '$lib/macro/macro';

export type Proxied<C> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[P in keyof C]: C[P] extends Derive<any> ? { (): number }
	: C[P] extends Macro ? { expr: string; (): number }
	: C[P] extends object ? Proxied<C[P]>
	: C[P];
};

export function characterProxy<O extends object>(obj: O, onUpdate: (obj: O) => void) {
	return new DeepProxy(obj, {
		get(target, p, receiver) {
			const value = Reflect.get(target, p, receiver);

			if ((typeof value === 'object' || typeof value === 'function') && value !== null) {
				return this.nest(value);
			} else {
				return value;
			}
		},

		set(target, p, value, receiver) {
			Reflect.set(target, p, value, receiver);
			onUpdate(this.rootTarget);
			return true;
		},

		apply(target, thisArg, argArray) {
			if (isDerive(target) || isMacro(target)) {
				return Reflect.apply(target, thisArg, [this.rootTarget]);
			} else if (typeof target === 'function') {
				return Reflect.apply(target, thisArg, argArray);
			} else {
				throw new Error('Not Callable!');
			}
		},
	}) as Proxied<O>;
}
