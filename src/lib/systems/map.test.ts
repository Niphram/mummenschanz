import { Serialize } from 'cerialize';
import { describe, expect, it } from 'vitest';

import { SYSTEM_MAP } from './map';
import { VersionedCharacter } from './versioned-character';

describe('Systems', () => {
	const systems = Object.entries(SYSTEM_MAP);

	describe.each(systems)('%s', async (system, systemImport) => {
		const { character, migrations } = (await systemImport()).default;

		describe('Character', () => {
			it('should extend VersionedCharacter', () => {
				expect(new character()).toBeInstanceOf(VersionedCharacter);
			});

			it('should have correct system', () => {
				expect(new character().system).toBe(system);
			});

			it('version should match migrations', () => {
				expect(new character().version).toBe(migrations.length);
			});

			it('should inherit serialization from VersionedCharacter', () => {
				const serialized: VersionedCharacter = Serialize(new character());

				expect(serialized.id).toBeDefined();
				expect(serialized.system).toBe(system);
				expect(serialized.version).toBe(migrations.length);
				expect(serialized.updated).toBeDefined();
				expect(serialized.name).toBe('Unnamed Character');
			});
		});
	});
});
