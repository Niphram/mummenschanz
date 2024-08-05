import { derive } from '$lib/macro/derive';
import { macro } from '$lib/macro/macro';
import { mapSum } from '$lib/utils';
import { autoserialize } from 'cerialize';
import type { PathfinderCharacter } from './character';
import { Dice } from './dice';

export class Class {
	@autoserialize
	name = 'Unnamed Class';

	@autoserialize
	level = 1;

	@autoserialize
	favored = false;

	hit_dice: Dice = Dice.D8;

	bab = 1;

	fort_save = 0;
	ref_save = 0;
	will_save = 0;

	skillranks_base = 4;
	skillranks_misc = macro('');

	readonly skillranks_perlevel = derive(
		(c: PathfinderCharacter) => this.skillranks_base + c.int.mod(c),
	);
	readonly skillranks = derive(
		(c: PathfinderCharacter) => this.skillranks_perlevel(c) * this.level + this.skillranks_misc(c),
	);

	speed = 0;

	spellcaster = false;
	casterlevel_is_classlevel = true;
	casterlevel_override = 0;
	get casterlevel() {
		return this.casterlevel_is_classlevel ? this.level : this.casterlevel_override;
	}

	spellcasting?: string;
	spells_per_day = 0;
	spells_known = 0;
}

export class Classes extends Array<Class> {
	get level() {
		return mapSum(this, (c) => c.level);
	}
}
