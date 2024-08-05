import { autoserialize } from 'cerialize';
import type { AbilityKey } from './ability';
import { macro, autoserializeMacro } from '$lib/macro/macro';
import { derive, type Derive } from '$lib/macro/derive';
import type { PathfinderCharacter } from './character';
import { mapSum } from '$lib/utils';

export const SAVE_KEYS = ['fort', 'ref', 'will'] as const;
export type SaveKey = (typeof SAVE_KEYS)[number];

const DefaultBaseAbility = {
	fort: 'con',
	ref: 'dex',
	will: 'wis',
} satisfies Record<SaveKey, AbilityKey>;

export class Save {
	@autoserialize
	ability: AbilityKey;

	resist = 0; //"?"

	@autoserializeMacro
	misc = macro('0');

	@autoserializeMacro
	bonus = macro('0'); //

	readonly base: Derive<PathfinderCharacter>;

	readonly ability_mod = derive((c: PathfinderCharacter) => c[this.ability].mod(c));

	readonly mod = derive(
		(c: PathfinderCharacter) => this.base(c) + this.ability_mod(c) + this.misc(c) + this.bonus(c),
	);

	constructor(key: SaveKey) {
		this.ability = DefaultBaseAbility[key];
		this.base = derive((c: PathfinderCharacter) => mapSum(c.classes, (c) => c[`${key}_save`]));
	}
}
