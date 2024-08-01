import { autoserialize } from 'cerialize';
import { nanoid } from 'nanoid';

import { macro, serializeMacro } from '$lib/macro/macro';

import type { PathfinderCharacter } from './character';

export class Trait {
	@autoserialize
	id = nanoid();

	@autoserialize
	name = '';

	@serializeMacro
	perDay = macro('');

	@autoserialize
	remaining = 0;

	@autoserialize
	description = '';

	recharge(c: PathfinderCharacter) {
		if (this.perDay.expr) {
			this.remaining = this.perDay(c);
		}
	}
}
