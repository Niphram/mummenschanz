import { autoserialize } from 'cerialize';

import { Derive } from '$lib/macro/derive';
import { Macro, serializeMacro } from '$lib/macro/macro';

import type { PathfinderCharacter } from './character';

export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	@serializeMacro
	base = new Macro('10');

	@serializeMacro
	bonus = new Macro('0');

	@serializeMacro
	temp = new Macro('0');

	@autoserialize
	notes = '';

	readonly total = new Derive(
		(c: PathfinderCharacter) =>
			c[this.key].base.eval(c) +
			c.race[this.key].eval(c) +
			c[this.key].bonus.eval(c) +
			c[this.key].temp.eval(c),
	);

	readonly mod = new Derive(
		(c: PathfinderCharacter) => Math.floor(c[this.key].total.eval(c) / 2) - 5,
	);

	constructor(private key: AbilityKey) {}
}
