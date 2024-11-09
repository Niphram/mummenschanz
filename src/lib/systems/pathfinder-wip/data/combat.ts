import { autoserialize } from 'cerialize';

import { derive } from '$lib/macro/derive';
import { autoserializeMacro, macro } from '$lib/macro/macro';

import type { AbilityKey } from './ability';
import type { PathfinderCharacter } from './character';

export class Combat {
	@autoserializeMacro
	babMisc = macro('0');

	@autoserialize
	meeleeAbility: AbilityKey = 'str';

	@autoserialize
	rangedAbility: AbilityKey = 'dex';

	@autoserializeMacro
	meeleeMisc = macro('0');

	@autoserializeMacro
	rangedMisc = macro('0');

	@autoserializeMacro
	cmbMisc = macro('0');

	readonly bab = derive((c: PathfinderCharacter) => c.classes.bab + this.babMisc(c));

	readonly meelee = derive(
		(c: PathfinderCharacter) =>
			this.bab(c) + c[this.meeleeAbility].mod(c) /* + size */ + this.meeleeMisc(c),
	);

	readonly ranged = derive(
		(c: PathfinderCharacter) =>
			this.bab(c) + c[this.rangedAbility].mod(c) /* + size */ + this.rangedMisc(c),
	);

	readonly cmb = derive(
		(c: PathfinderCharacter) => this.bab(c) + c.dex.mod(c) /* + size */ + this.cmbMisc(c),
	);
}
