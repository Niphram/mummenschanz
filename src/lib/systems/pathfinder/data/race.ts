import { autoserialize } from 'cerialize';

import { macro, autoserializeMacro } from '$lib/macro/macro';

export const SIZE_KEYS = [
	'fine',
	'diminutive',
	'tiny',
	'small',
	'medium',
	'large',
	'huge',
	'gargantuan',
	'colossal',
];
export type SizeKey = (typeof SIZE_KEYS)[number];

export class Race {
	@autoserialize
	name = 'Unknown Race';

	@autoserializeMacro
	speed = macro('30');

	@autoserialize
	size: SizeKey = 'medium';

	@autoserializeMacro
	str = macro('0');

	@autoserializeMacro
	dex = macro('0');

	@autoserializeMacro
	con = macro('0');

	@autoserializeMacro
	int = macro('0');

	@autoserializeMacro
	wis = macro('0');

	@autoserializeMacro
	cha = macro('0');
}
