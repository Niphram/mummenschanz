import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';
import { macro, serializeMacro } from '$lib/macro/macro';

import type { PathfinderCharacter } from './character';

export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	@serializeMacro
	base = macro('10');

	@serializeMacro
	bonus = macro('0');

	@serializeMacro
	temp = macro('0');

	@autoserialize
	notes = '';

	readonly total = derive(
		(c: PathfinderCharacter) =>
			c[this.key].base(c) + c.race[this.key](c) + c[this.key].bonus(c) + c[this.key].temp(c),
	);

	readonly mod = derive((c: PathfinderCharacter) => Math.floor(c[this.key].total(c) / 2) - 5);

	constructor(private key: AbilityKey) {}
}
