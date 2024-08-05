import { autoserialize } from 'cerialize';
import type { AbilityKey } from './ability';
import { derive } from '$lib/macro/derive';
import type { PathfinderCharacter } from './character';
import { autoserializeMacro, macro } from '$lib/macro/macro';

export class ArmorClass {
	@autoserialize
	primary_ability: AbilityKey = 'dex';

	@autoserialize
	secondary_ability?: AbilityKey;

	@autoserializeMacro
	misc = macro('0');

	@autoserializeMacro
	bonus = macro('0');

	readonly condition_mod = derive(() => 0); // TODO

	@autoserializeMacro
	dodge_bonus = macro('0');
	readonly dodge_items = derive((c: PathfinderCharacter) => Math.max(this.dodge_bonus(c), 0)); // TODO

	@autoserializeMacro
	armor_bonus = macro('0');
	readonly armor = derive((c: PathfinderCharacter) => Math.max(this.armor_bonus(c), 0)); // TODO

	@autoserializeMacro
	shield_bonus = macro('0');
	readonly shield = derive((c: PathfinderCharacter) => Math.max(this.shield_bonus(c), 0)); // TODO

	@autoserializeMacro
	natural_bonus = macro('0');
	readonly natural = derive((c: PathfinderCharacter) => Math.max(this.natural_bonus(c), 0)); // TODO

	@autoserializeMacro
	deflection_bonus = macro('0');
	readonly deflection = derive((c: PathfinderCharacter) => Math.max(this.deflection_bonus(c), 0)); // TODO

	readonly ability_mod = derive(
		(c: PathfinderCharacter) =>
			c[this.primary_ability].mod(c) +
			(this.secondary_ability ? c[this.secondary_ability].mod(c) : 0),
	);

	readonly size_mod = derive(() => 0); // TODO

	readonly ac = derive(
		(c: PathfinderCharacter) =>
			10 +
			this.ability_mod(c) +
			this.size_mod(c) +
			this.condition_mod(c) +
			this.misc(c) +
			this.dodge_items(c) +
			this.armor(c) +
			this.shield(c) +
			this.natural(c) +
			this.deflection(c),
	);

	readonly touch = derive(
		(c: PathfinderCharacter) =>
			10 +
			this.ability_mod(c) +
			this.size_mod(c) +
			this.condition_mod(c) +
			this.misc(c) +
			this.dodge_items(c) +
			this.deflection(c),
	);

	readonly flat_footed = derive(
		(c: PathfinderCharacter) =>
			10 +
			this.size_mod(c) +
			this.condition_mod(c) +
			this.misc(c) +
			this.armor(c) +
			this.shield(c) +
			this.natural(c) +
			this.deflection(c),
	);
}
