import { derive } from '$lib/macro/derive';
import { macro, autoserializeMacro } from '$lib/macro/macro';
import { autoserialize } from 'cerialize';
import type { PathfinderCharacter } from './character';

export const ABILITY_KEYS = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
export type AbilityKey = (typeof ABILITY_KEYS)[number];

export class Ability {
	@autoserializeMacro
	base = macro('10');

	@autoserializeMacro
	enhance = macro('');

	@autoserializeMacro
	inherent = macro('');

	@autoserializeMacro
	penalty = macro('');

	@autoserialize
	notes = '';

	readonly total;

	readonly base_mod = derive((c: PathfinderCharacter) =>
		Math.max(-5, Math.floor(this.base(c) / 2) - 5),
	);

	readonly mod = derive((c: PathfinderCharacter) =>
		Math.max(-5, Math.floor(this.total(c) / 2) - 5),
	);

	constructor(key: AbilityKey) {
		this.total = derive((c: PathfinderCharacter) => this.base(c) + this.enhance(c));
	}
}
