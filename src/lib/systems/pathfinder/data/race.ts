import { autoserialize } from 'cerialize';

import { macro, serializeMacro } from '$lib/macro/macro';

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

	@serializeMacro
	speed = macro('30');

	@autoserialize
	size: SizeKey = 'medium';

	@serializeMacro
	str = macro('0');

	@serializeMacro
	dex = macro('0');

	@serializeMacro
	con = macro('0');

	@serializeMacro
	int = macro('0');

	@serializeMacro
	wis = macro('0');

	@serializeMacro
	cha = macro('0');
}
