import type { SIZE_KEYS } from '../data';

export const SIZE_KEY = [
	'fine',
	'diminutive',
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
	'gargantuan',
	'colossal',
] as const;
export type Size = (typeof SIZE_KEYS)[number];

type SizeMods = {
	atk_ac: number;
	cmb_cmd: number;
	fly_skill: number;
	stealth_skill: number;
	carrying_capacity: number;
};

export const SIZES = {
	fine: { atk_ac: 8, cmb_cmd: -8, fly_skill: 8, stealth_skill: 16, carrying_capacity: 0.125 },
	diminutive: { atk_ac: 4, cmb_cmd: -4, fly_skill: 6, stealth_skill: 12, carrying_capacity: 0.25 },
	tiny: { atk_ac: 2, cmb_cmd: -2, fly_skill: 4, stealth_skill: 8, carrying_capacity: 0.5 },
	small: { atk_ac: 1, cmb_cmd: -1, fly_skill: 2, stealth_skill: 4, carrying_capacity: 0.75 },
	medium: { atk_ac: 0, cmb_cmd: 0, fly_skill: 0, stealth_skill: 0, carrying_capacity: 1 },
	large: { atk_ac: -1, cmb_cmd: 1, fly_skill: -2, stealth_skill: -4, carrying_capacity: 2 },
	huge: { atk_ac: -2, cmb_cmd: 2, fly_skill: -4, stealth_skill: -8, carrying_capacity: 4 },
	gargantuan: { atk_ac: -4, cmb_cmd: 4, fly_skill: -6, stealth_skill: -12, carrying_capacity: 8 },
	colossal: { atk_ac: -8, cmb_cmd: 8, fly_skill: -8, stealth_skill: -16, carrying_capacity: 16 },
} satisfies Record<Size, SizeMods>;
