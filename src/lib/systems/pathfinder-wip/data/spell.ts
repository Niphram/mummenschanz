import { autoserializeMacro, macro } from '$lib/macro/macro';
import { mapSum } from '$lib/utils';
import { autoserializeArrayAs } from '$lib/utils/serialize';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { nanoid } from 'nanoid';
import type { AbilityKey } from './ability';

export const CASTING_TYPE = ['prepared', 'spontaneous'] as const;
export type CastingType = (typeof CASTING_TYPE)[number];

export const SPELL_LEVELS = [
	'level_0',
	'level_1',
	'level_2',
	'level_3',
	'level_4',
	'level_5',
	'level_6',
	'level_7',
	'level_8',
	'level_9',
] as const;
export type SpellLevel = (typeof SPELL_LEVELS)[number];

export const SPELL_ATTACK_TYPE = [
	'touch',
	'rangedTouch',
	'cmb',
	'str',
	'dex',
	'con',
	'wis',
	'int',
	'cha',
] as const;
export type SpellAttackType = (typeof SPELL_ATTACK_TYPE)[number];

export class SpellDamage {
	id = nanoid();

	@autoserialize
	damage = '';

	@autoserialize
	type = '';
}

export class SpellCommonProps {
	id = nanoid();

	@autoserialize
	name = 'Unnamed Spell';

	@autoserialize
	school = '';

	@autoserialize
	classAndLevel = '';

	@autoserialize
	castingTime = '';

	@autoserialize
	range = '';

	@autoserialize
	area = '';

	@autoserialize
	effect = '';

	@autoserialize
	duration = '';

	@autoserialize
	spellResistance = '';

	// Spell save

	@autoserialize
	hasSave = false;

	@autoserialize
	saveEffect = '';

	@autoserialize
	saveDcMod = 0;

	// Spell attack

	@autoserialize
	hasAttack = false;

	@autoserialize
	attackType?: SpellAttackType;

	@autoserialize
	attackMod = 0;

	@autoserialize
	attackCritRange = 20;

	@autoserialize
	attackCritMultiplier = 2;

	@autoserializeAs(SpellDamage)
	damage: SpellDamage[] = [];

	// Misc

	@autoserialize
	notes = '';

	@autoserialize
	open = false;
}

@inheritSerialization(SpellCommonProps)
export class Spell extends SpellCommonProps {
	@autoserialize
	prepared = 0;

	@autoserialize
	used = 0;

	@autoserialize
	isDomainSpell = false;

	@autoserialize
	components = '';
}

export const SPELL_LIKE_CASTING_TYPES = ['constant', 'atWill', 'perDay'] as const;
export type SpellLikeCastingType = (typeof SPELL_LIKE_CASTING_TYPES)[number];

@inheritSerialization(SpellCommonProps)
export class SpellLikeAbility extends SpellCommonProps {
	@autoserialize
	type: SpellLikeCastingType = 'atWill';

	@autoserialize
	perDay = 1;

	@autoserialize
	remaining = 1;
}

export class SpellLevelList extends Array<Spell> {
	@autoserialize
	known = 0;

	@autoserialize
	perDay = 0;

	@autoserialize
	perDayBonus = 0;

	@autoserialize
	dcBonus = 0;

	get prepared() {
		return mapSum(this, (s) => s.prepared);
	}

	get used() {
		return mapSum(this, (s) => s.used);
	}
}

export class SpellList {
	@autoserialize
	castingType: CastingType = 'prepared';

	@autoserialize
	dcAbility?: AbilityKey;

	@autoserializeMacro
	dcBonus = macro('0');

	@autoserializeArrayAs(SpellLevelList, Spell)
	level_0 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_1 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_2 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_3 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_4 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_5 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_6 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_7 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_8 = new SpellLevelList();
	@autoserializeArrayAs(SpellLevelList, Spell)
	level_9 = new SpellLevelList();

	@autoserializeAs(SpellLikeAbility)
	spellLikeAbilities: SpellLikeAbility[] = [];
}
