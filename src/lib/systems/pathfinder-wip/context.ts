import { getContext, setContext } from 'svelte';
import type { Writable } from 'svelte/store';

import type { Proxied } from '$lib/systems';

import type { PathfinderCharacter } from './data/character';

const CONTEXT_SYMBOL = Symbol('pathfinder wip char');

export function setChar(store: Writable<Proxied<PathfinderCharacter>>) {
	setContext(CONTEXT_SYMBOL, store);
}

export function char() {
	return getContext<Writable<Proxied<PathfinderCharacter>>>(CONTEXT_SYMBOL);
}
