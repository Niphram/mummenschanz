import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';
import { macro, autoserializeMacro } from '$lib/macro/macro';

import type { AbilityKey } from './ability';
import type { PathfinderCharacter } from './character';

export const SAVE_KEYS = ['fort', 'ref', 'will'] as const;
export type SaveKey = (typeof SAVE_KEYS)[number];

const DefaultBaseAbility = {
	fort: 'con',
	ref: 'dex',
	will: 'wis',
} as const;

export class Save {
	@autoserialize
	ability: AbilityKey;

	@autoserializeMacro
	bonus = macro('0');

	@autoserializeMacro
	misc = macro('0');

	@autoserialize
	notes = '';

	readonly mod = derive(
		(c: PathfinderCharacter) =>
			c.classes[this.key] + c[this.ability].mod(c) + c[this.key].bonus(c) + c[this.key].misc(c),
	);

	constructor(private key: SaveKey) {
		this.ability = DefaultBaseAbility[key];
	}
}
