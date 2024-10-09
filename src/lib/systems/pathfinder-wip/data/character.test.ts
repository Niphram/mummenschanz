import { describe, expect, it } from 'vitest';

import { PathfinderCharacter } from './character';

describe('Pathfinder Character', () => {
	describe('Hitpoints', () => {
		describe('heal()', () => {
			it('should reduce lethal and non-lethal damage', () => {
				const char = new PathfinderCharacter();
				char.hp.damage_taken = 10;
				char.hp.non_lethal = 5;

				char.hp.heal(15);

				expect(char.hp.damage_taken).toBe(0);
				expect(char.hp.non_lethal).toBe(0);
			});
		});

		describe('dealLethal()', () => {
			it('should increase damage taken', () => {
				const char = new PathfinderCharacter();

				char.hp.dealLethal(15);

				expect(char.hp.damage_taken).toBe(15);
			});

			it('should reduce temporary HP first', () => {
				const char = new PathfinderCharacter();
				char.hp.temp = 10;

				char.hp.dealLethal(15);

				expect(char.hp.temp).toBe(0);
				expect(char.hp.damage_taken).toBe(5);
			});
		});

		describe('dealNonLethal()', () => {
			it('should increase non lethal damage taken', () => {
				const char = new PathfinderCharacter();

				char.hp.dealNonLethal(15);

				expect(char.hp.non_lethal).toBe(15);
			});
		});
	});
});
