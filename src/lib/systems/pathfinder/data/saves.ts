import { autoserialize } from 'cerialize';

import { Derive } from '$lib/macro/derive';
import { Macro, serializeMacro } from '$lib/macro/macro';

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

	@serializeMacro
	bonus = new Macro('0');

	@serializeMacro
	misc = new Macro('0');

	@autoserialize
	notes = '';

	readonly mod = new Derive(
		(c: PathfinderCharacter) =>
			c.classes[this.key] +
			c[this.ability].mod.eval(c) +
			c[this.key].bonus.eval(c) +
			c[this.key].misc.eval(c),
	);

	constructor(private key: SaveKey) {
		this.ability = DefaultBaseAbility[key];
	}
}
