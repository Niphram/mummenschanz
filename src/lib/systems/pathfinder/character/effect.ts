import { autoserialize } from 'cerialize';

export const BONUS_TYPES = [
	'alchemical',
	'armor',
	'circumstance_stacks',
	'competence',
	'deflect_enhance_resist',
	'dodge_stacks',
	'insight',
	'luck',
	'morale',
	'precision_damage',
	'sacred_profane',
	'size',
	'untypes_stacks',
] as const;
export type BonusType = (typeof BONUS_TYPES)[number];

export class Effect {
	@autoserialize
	name: string;

	@autoserialize
	type: BonusType;

	@autoserialize
	active = false;

	ac = 0;

	constructor(name = 'Unnamed Effect', type: BonusType = 'untypes_stacks') {
		this.name = name;
		this.type = type;
	}
}
