import { autoserialize, autoserializeAs } from 'cerialize';
import { nanoid } from 'nanoid';

import { derive } from '$lib/macro/derive';
import { macro, serializeMacro } from '$lib/macro/macro';

import type { AbilityKey } from './ability';
import type { PathfinderCharacter } from './character';
import type { SizeKey } from './race';

const sizeModifiers: Record<SizeKey, { mod: number; ability: AbilityKey }> = {
	fine: { ability: 'dex', mod: -8 },
	diminutive: { ability: 'dex', mod: -4 },
	tiny: { ability: 'dex', mod: -2 },
	small: { ability: 'str', mod: -1 },
	medium: { ability: 'str', mod: 0 },
	large: { ability: 'str', mod: 1 },
	huge: { ability: 'str', mod: +2 },
	gargantuan: { ability: 'str', mod: +4 },
	colossal: { ability: 'str', mod: +8 },
};

export class SpellResistance {
	@serializeMacro
	base = macro('0');

	@serializeMacro
	misc = macro('0');

	@autoserialize
	notes = '';

	readonly total = derive((c: PathfinderCharacter) => c.combat.sr.base(c) + c.combat.sr.misc(c));
}

export class BaseAttackBonus {
	@autoserialize
	notes = '';

	readonly mod = derive((c: PathfinderCharacter) => c.classes.bab);
}

export class CombatManeuverBonus {
	@autoserialize
	notes = '';

	readonly mod = derive((c: PathfinderCharacter) => {
		const { ability, mod } = sizeModifiers[c.race.size];
		return c.combat.bab.mod(c) + mod + c[ability].mod(c);
	});
}

export class CombatManeuverDefense {
	@autoserialize
	notes = '';

	readonly mod = derive((c: PathfinderCharacter) => {
		const { mod } = sizeModifiers[c.race.size];
		return 10 + c.combat.bab.mod(c) + c.str.mod(c) + c.dex.mod(c) + mod;
	});
}

export const ATTACK_TYPES = [
	'meelee',
	'ranged',
	'cmb',
	'babFull',
	'babMax',
	'flurryOfBlows',
	'none',
] as const;
export type AttackType = (typeof ATTACK_TYPES)[number];

export class AttackRoll {
	@autoserialize
	baseModifier: AttackType = 'babFull';

	@autoserialize
	abilityModifier: AbilityKey | 'none' = 'none';

	@serializeMacro
	bonusModifier = macro('0');

	@autoserialize
	versus = 'AC';

	@autoserialize
	critRange = '20';

	@autoserialize
	range = '';

	readonly baseModValue = derive((c: PathfinderCharacter) =>
		// TODO: Check this
		this.baseModifier === 'none' ? 0
		: this.baseModifier === 'babMax' ? c.combat.bab.mod(c)
		: this.baseModifier === 'babFull' ? c.combat.bab.mod(c)
		: this.baseModifier === 'cmb' ? c.combat.cmb.mod(c)
		: this.baseModifier === 'meelee' ? c.combat.bab.mod(c) + c.str.mod(c)
		: this.baseModifier === 'ranged' ? c.combat.bab.mod(c) + c.dex.mod(c)
		: this.baseModifier === 'flurryOfBlows' ? 0
		: 0,
	);

	readonly abilityModValue = derive((c: PathfinderCharacter) =>
		this.abilityModifier !== 'none' ? c[this.abilityModifier].mod(c) : 0,
	);
}

export class Damage {
	@autoserialize
	damage = '';
}

export class Attack {
	id = nanoid();

	@autoserialize
	name = 'Unnamed Attack';

	@autoserialize
	category = '';

	@autoserialize
	type = '';

	@autoserialize
	hasAttack = false;

	@autoserializeAs(AttackRoll)
	attack = new AttackRoll();

	@autoserialize
	hasDamage = false;

	@autoserializeAs(Damage)
	damage = new Damage();

	@autoserialize
	notes = '';

	readonly attackBonus = derive((c: PathfinderCharacter) => {
		let total = this.attack.baseModValue(c);
		total += this.attack.abilityModValue(c);
		const bonus = this.attack.bonusModifier(c) ?? 0;
		total += Number.isNaN(bonus) ? 0 : bonus;
		return total;
	});
}

export class Combat {
	@autoserialize
	cmbAbility: AbilityKey = 'str';

	@autoserialize
	meeleeAbility: AbilityKey = 'str';

	@autoserialize
	rangedAbility: AbilityKey = 'dex';

	@autoserializeAs(SpellResistance)
	sr = new SpellResistance();

	@autoserializeAs(BaseAttackBonus)
	bab = new BaseAttackBonus();

	@autoserializeAs(CombatManeuverBonus)
	cmb = new CombatManeuverBonus();

	@autoserializeAs(CombatManeuverBonus)
	cmd = new CombatManeuverDefense();

	@autoserializeAs(Attack)
	attacks: Attack[] = [];
}
