import { autoserialize } from 'cerialize';
import { nanoid } from 'nanoid';

import { Macro, serializeMacro } from '$lib/macro/macro';

import type { PathfinderCharacter } from './character';

export class Trait {
	@autoserialize
	id = nanoid();

	@autoserialize
	name = '';

	@serializeMacro
	perDay = new Macro('');

	@autoserialize
	remaining = 0;

	@autoserialize
	description = '';

	recharge(c: PathfinderCharacter) {
		if (this.perDay.expr) {
			this.remaining = this.perDay.eval(c);
		}
	}
}
