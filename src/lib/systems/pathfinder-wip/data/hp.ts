import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';
import { autoserializeMacro, macro } from '$lib/macro/macro';
import { mapSum } from '$lib/utils';

import type { PathfinderCharacter } from './character';

export class HitPoints {
	@autoserialize
	rolled = 0;

	@autoserializeMacro
	bonus = macro('0');

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

	readonly current = derive((c: PathfinderCharacter) => c.hp.max(c) - this.damage_taken);

	readonly conHp = derive((c: PathfinderCharacter) => c.classes.level * c.con.mod(c));

	readonly max = derive(
		(c: PathfinderCharacter) =>
			(c.config.use_average_hp ? this.average(c) : this.rolled) + this.conHp(c) + this.bonus(c),
	);

	heal(amount: number) {
		this.damage_taken = Math.max(0, this.damage_taken - amount);
		this.non_lethal = Math.max(0, this.non_lethal - amount);
	}

	dealLethal(amount: number) {
		const remaining = Math.max(0, amount - this.temp);
		this.temp = Math.max(0, this.temp - amount);
		this.damage_taken += remaining;
	}

	dealNonLethal(amount: number) {
		this.non_lethal += amount;
	}
}
