import { derive, type Derive } from '$lib/macro/derive';
import type { PathfinderCharacter } from './character';

type Condition = {
	ac?: Derive<PathfinderCharacter>;
	str?: Derive<PathfinderCharacter>;
	dex?: Derive<PathfinderCharacter>;
	con?: Derive<PathfinderCharacter>;
	int?: Derive<PathfinderCharacter>;
	wis?: Derive<PathfinderCharacter>;
	cha?: Derive<PathfinderCharacter>;
	fort_save?: Derive<PathfinderCharacter>;
	ref_save?: Derive<PathfinderCharacter>;
	will_save?: Derive<PathfinderCharacter>;
	meelee_atk?: Derive<PathfinderCharacter>;
	meelee_dmg?: Derive<PathfinderCharacter>;
	ranged_atk?: Derive<PathfinderCharacter>;
	ranged_dmg?: Derive<PathfinderCharacter>;
	skills?: Derive<PathfinderCharacter>;
	cl?: Derive<PathfinderCharacter>;
	move_speed_mult?: Derive<PathfinderCharacter>;
	charge_speed_mult?: Derive<PathfinderCharacter>;
	run_speed_mult?: Derive<PathfinderCharacter>;
	specific_skills?: string[];
	specific_skills_mod?: number;
};

export const CONDITIONS = {
	blinded: {
		ac: derive((c: PathfinderCharacter) => -c.dex.mod - 2),
		specific_skills: [
			'acrobatics',
			'Climb',
			'Disable Device',
			'Escape Artist',
			'Fly',
			'Ride',
			'Stealth',
			'Swim',
			'Sleight of Hand',
		],
		specific_skills_mod: -4,
	},
	confused: {},
	cowering: {
		ac: derive((c: PathfinderCharacter) => -c.dex.mod - 2),
	},
	dazed: {},
	dazzled: {
		meelee_atk: derive(() => -1),
		ranged_atk: derive(() => -1),
		specific_skills: ['perception'],
		specific_skills_mod: -1,
	},
} satisfies Record<string, Condition>;
