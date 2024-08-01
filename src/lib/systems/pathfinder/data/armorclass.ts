import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';

import type { AbilityKey } from './ability';
import type { PathfinderCharacter } from './character';

export class ArmorClass {
	@autoserialize
	primaryAbility: AbilityKey = 'dex';

	@autoserialize
	secondaryAbility?: AbilityKey;

	readonly abilityMod = derive(
		(c: PathfinderCharacter) =>
			c[this.primaryAbility].mod(c) + (this.secondaryAbility ? c[this.secondaryAbility].mod(c) : 0),
	);

	readonly total = derive(
		(c: PathfinderCharacter) => 10 + c.ac.abilityMod(c) + c.equipment.acBonus,
	);

	readonly touch = derive((c: PathfinderCharacter) => 10 + c.ac.abilityMod(c));

	readonly flatFooted = derive(
		(c: PathfinderCharacter) => 10 + c.equipment.acBonus + Math.min(c.ac.abilityMod(c), 0),
	);
}
