import { derive } from '$lib/macro/derive';
import { autoserializeMacro, macro } from '$lib/macro/macro';
import { mapSum } from '$lib/utils';
import { autoserialize, autoserializeAs } from 'cerialize';
import type { AbilityKey } from './ability';
import type { PathfinderCharacter } from './character';

const SKILLS = {
	acrobatics: { ability: 'dex', trained: false, penalty: true },
	appraise: { ability: 'int', trained: false, penalty: false },
	bluff: { ability: 'cha', trained: false, penalty: false },
	climb: { ability: 'str', trained: false, penalty: false },
	craft: { ability: 'int', trained: false, penalty: false },
	diplomacy: { ability: 'cha', trained: false, penalty: false },
	disableDevice: { ability: 'dex', trained: true, penalty: true },
	disguise: { ability: 'cha', trained: false, penalty: false },
	escapeArtist: { ability: 'dex', trained: false, penalty: true },
	fly: { ability: 'dex', trained: false, penalty: true },
	handleAnimal: { ability: 'cha', trained: true, penalty: false },
	heal: { ability: 'wis', trained: false, penalty: false },
	intimidate: { ability: 'cha', trained: false, penalty: false },
	knowledgeArcana: { ability: 'int', trained: true, penalty: false },
	knowledgeDungeoneering: { ability: 'int', trained: true, penalty: false },
	knowledgeEngineering: { ability: 'int', trained: true, penalty: false },
	knowledgeGeography: { ability: 'int', trained: true, penalty: false },
	knowledgeHistory: { ability: 'int', trained: true, penalty: false },
	knowledgeLocal: { ability: 'int', trained: true, penalty: false },
	knowledgeNature: { ability: 'int', trained: true, penalty: false },
	knowledgeNobility: { ability: 'int', trained: true, penalty: false },
	knowledgePlanes: { ability: 'int', trained: true, penalty: false },
	knowledgeReligion: { ability: 'int', trained: true, penalty: false },
	linguistics: { ability: 'int', trained: true, penalty: false },
	perception: { ability: 'wis', trained: false, penalty: false },
	perform: { ability: 'cha', trained: false, penalty: false },
	profession: { ability: 'wis', trained: true, penalty: false },
	ride: { ability: 'dex', trained: false, penalty: true },
	senseMotive: { ability: 'wis', trained: false, penalty: false },
	sleightOfHand: { ability: 'dex', trained: true, penalty: true },
	spellcraft: { ability: 'int', trained: true, penalty: false },
	stealth: { ability: 'dex', trained: false, penalty: true },
	survival: { ability: 'wis', trained: false, penalty: false },
	swim: { ability: 'str', trained: false, penalty: false },
	useMagicDevice: { ability: 'cha', trained: true, penalty: false },
} as const;
export const SKILL_KEYS = Object.keys(SKILLS);
export type SkillKey = keyof typeof SKILLS;

export class SkillVariant {
	@autoserialize
	name = '';

	@autoserialize
	ability: AbilityKey = 'str';

	@autoserialize
	penalty = false;

	@autoserialize
	ranks = 0;

	@autoserializeMacro
	misc = macro('0');

	@autoserializeMacro
	bonus = macro('0');

	@autoserialize
	classSkill = false;

	@autoserialize
	notes = '';

	readonly ability_mod = derive((c: PathfinderCharacter) => c[this.ability].mod(c));

	readonly total = derive(
		(c: PathfinderCharacter) =>
			this.ability_mod(c) +
			this.ranks +
			this.misc(c) +
			this.bonus(c) +
			(this.classSkill && this.ranks > 0 ? 3 : 0),
	);

	constructor(key?: SkillKey) {
		if (key) {
			this.ability = SKILLS[key].ability;
			this.penalty = SKILLS[key].penalty;
		}
	}
}

export class Skill {
	@autoserializeAs(SkillVariant)
	variants: SkillVariant[];

	@autoserialize
	shown = true;

	readonly trained: boolean = false;

	get ranks() {
		return mapSum(this.variants, (variant) => variant.ranks);
	}

	constructor(key: SkillKey) {
		this.variants = [new SkillVariant(key)];

		this.trained = SKILLS[key].trained;
	}
}

export class Skills {
	@autoserializeAs(Skill)
	acrobatics = new Skill('acrobatics');

	@autoserializeAs(Skill)
	appraise = new Skill('appraise');

	@autoserializeAs(Skill)
	bluff = new Skill('bluff');

	@autoserializeAs(Skill)
	climb = new Skill('climb');

	@autoserializeAs(Skill)
	craft = new Skill('craft');

	@autoserializeAs(Skill)
	diplomacy = new Skill('diplomacy');

	@autoserializeAs(Skill)
	disableDevice = new Skill('disableDevice');

	@autoserializeAs(Skill)
	disguise = new Skill('disguise');

	@autoserializeAs(Skill)
	escapeArtist = new Skill('escapeArtist');

	@autoserializeAs(Skill)
	fly = new Skill('fly');

	@autoserializeAs(Skill)
	handleAnimal = new Skill('handleAnimal');

	@autoserializeAs(Skill)
	heal = new Skill('heal');

	@autoserializeAs(Skill)
	intimidate = new Skill('intimidate');

	@autoserializeAs(Skill)
	knowledgeArcana = new Skill('knowledgeArcana');

	@autoserializeAs(Skill)
	knowledgeDungeoneering = new Skill('knowledgeDungeoneering');

	@autoserializeAs(Skill)
	knowledgeEngineering = new Skill('knowledgeEngineering');

	@autoserializeAs(Skill)
	knowledgeGeography = new Skill('knowledgeGeography');

	@autoserializeAs(Skill)
	knowledgeHistory = new Skill('knowledgeHistory');

	@autoserializeAs(Skill)
	knowledgeLocal = new Skill('knowledgeLocal');

	@autoserializeAs(Skill)
	knowledgeNature = new Skill('knowledgeNature');

	@autoserializeAs(Skill)
	knowledgeNobility = new Skill('knowledgeNobility');

	@autoserializeAs(Skill)
	knowledgePlanes = new Skill('knowledgePlanes');

	@autoserializeAs(Skill)
	knowledgeReligion = new Skill('knowledgeReligion');

	@autoserializeAs(Skill)
	linguistics = new Skill('linguistics');

	@autoserializeAs(Skill)
	perception = new Skill('perception');

	@autoserializeAs(Skill)
	perform = new Skill('perform');

	@autoserializeAs(Skill)
	profession = new Skill('profession');

	@autoserializeAs(Skill)
	ride = new Skill('ride');

	@autoserializeAs(Skill)
	senseMotive = new Skill('senseMotive');

	@autoserializeAs(Skill)
	sleightOfHand = new Skill('sleightOfHand');

	@autoserializeAs(Skill)
	spellcraft = new Skill('spellcraft');

	@autoserializeAs(Skill)
	stealth = new Skill('stealth');

	@autoserializeAs(Skill)
	survival = new Skill('survival');

	@autoserializeAs(Skill)
	swim = new Skill('swim');

	@autoserializeAs(Skill)
	useMagicDevice = new Skill('useMagicDevice');

	get total_ranks() {
		return mapSum(SKILL_KEYS, (key) => this[key].ranks);
	}

	readonly total_ranks_max = derive((c: PathfinderCharacter) =>
		mapSum(c.classes, (cl) => cl.total_skillranks(c)),
	);
}
