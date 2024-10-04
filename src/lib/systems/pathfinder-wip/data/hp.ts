import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';
import { mapSum } from '$lib/utils';

import type { PathfinderCharacter } from './character';

export class HitPoints {
	@autoserialize
	rolled = 0;

	// Average HP based on hit dice
	readonly average = derive((c: PathfinderCharacter) =>
		mapSum(c.classes, (cls) => Math.ceil((cls.hit_dice + 1) / 2) * cls.level),
	);

	@autoserialize
	temp = 0;

	@autoserialize
	damage_taken = 0;

	@autoserialize
	non_lethal = 0;

	readonly max = derive(
		(c: PathfinderCharacter) =>
			(c.config.use_average_hp ? this.average(c) : this.rolled) + c.classes.level * c.con.mod(c),
	);
}
