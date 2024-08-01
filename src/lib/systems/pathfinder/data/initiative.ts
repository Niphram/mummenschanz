import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';
import { macro, serializeMacro } from '$lib/macro/macro';

import type { PathfinderCharacter } from './character';

export class Initiative {
	@serializeMacro
	misc = macro('0');

	@autoserialize
	notes = '';

	readonly mod = derive((c: PathfinderCharacter) => c.dex.mod(c) + c.init.misc(c));
}
