import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';
import { macro, autoserializeMacro } from '$lib/macro/macro';

import type { PathfinderCharacter } from './character';

export class Initiative {
	@autoserializeMacro
	misc = macro('0');

	@autoserialize
	notes = '';

	readonly mod = derive((c: PathfinderCharacter) => c.dex.mod(c) + c.init.misc(c));
}
