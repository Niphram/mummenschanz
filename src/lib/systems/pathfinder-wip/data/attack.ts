import { autoserialize } from 'cerialize';
import { nanoid } from 'nanoid';

import { derive } from '$lib/macro/derive';

import type { AbilityKey } from './ability';
import type { PathfinderCharacter } from './character';

export const ATTACK_BASE = ['meelee', 'ranged', 'babFull', 'babMax'] as const;
export type AttackBase = (typeof ATTACK_BASE)[number];

function attackArray(attackCount: number, maxAttack: number) {
	return Array.from({ length: attackCount }, (_, idx) => maxAttack - idx * 5);
}

export class Attack {
	id = nanoid();

	@autoserialize
	name = 'Unnamed Attack';

	@autoserialize
	attackBase?: AttackBase;

	@autoserialize
	attackAbility?: AbilityKey;

	@autoserialize
	damage = '';

	@autoserialize
	notes = '';

	@autoserialize
	show_details = false;

	readonly attackMods = derive((c: PathfinderCharacter) => {
		const bab = c.combat.bab(c);
		const fullAttackCount = Math.max(Math.ceil(bab / 5), 1);
		const abilityMod = this.attackAbility ? c[this.attackAbility].mod(c) : 0;

		switch (this.attackBase) {
			case 'meelee':
				return attackArray(fullAttackCount, c.combat.meelee(c) + abilityMod);
			case 'ranged':
				return attackArray(fullAttackCount, c.combat.ranged(c) + abilityMod);
			case 'babFull':
				return attackArray(fullAttackCount, bab + abilityMod);
			case 'babMax':
				return attackArray(1, bab + abilityMod);
			default:
				return attackArray(1, abilityMod);
		}
	});
}
