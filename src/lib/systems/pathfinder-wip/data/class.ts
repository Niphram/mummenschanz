import { derive } from '$lib/macro/derive';
import { autoserializeMacro, macro } from '$lib/macro/macro';
import { mapSum } from '$lib/utils';
import { autoserialize } from 'cerialize';
import type { PathfinderCharacter } from './character';
import type { Dice } from './dice';

export class Class {
	@autoserialize
	name = 'Unnamed Class';

	@autoserialize
	level = 1;

	@autoserialize
	favored = false;

	@autoserialize
	hit_dice: Dice = 8;

	@autoserialize
	bab = 0;

	@autoserialize
	fort_save = 0;
	@autoserialize
	ref_save = 0;
	@autoserialize
	will_save = 0;

	@autoserialize
	skillranks_base = 0;
	@autoserializeMacro
	skillranks_bonus = macro('');

	readonly skillranks_per_level = derive(
		(c: PathfinderCharacter) => this.skillranks_base + c.int.mod(c),
	);

	readonly total_skillranks = derive(
		(c: PathfinderCharacter) =>
			this.skillranks_per_level(c) * this.level + this.skillranks_bonus(c),
	);

	@autoserialize
	speed = 0;
}

export class Classes extends Array<Class> {
	get level() {
		return mapSum(this, (c) => c.level);
	}

	get bab() {
		return mapSum(this, (c) => c.bab);
	}
}
