import { browser } from '$app/environment';
import { GenericDeserializeInto, Serialize } from 'cerialize';
import { writable, type Writable } from 'svelte/store';

import { initDB } from '$lib/idb-store';
import { type CharacterMigrationFn, VersionedCharacter } from '$lib/systems/versioned-character';
import { debounce, lazy } from '$lib/utils';
import { SYSTEM_MAP } from './systems';

function migrateCharacter(data: VersionedCharacter, migrations: CharacterMigrationFn[]) {
	return migrations
		.slice(data.version)
		.reduce((previousCharData, migrateFunction) => migrateFunction(previousCharData), data);
}

type DBTypes = {
	characters: {
		key: string;
		value: VersionedCharacter;
		indexes: {
			id_idx: string;
			updated_idx: Date;
		};
	};
};

const dbInstance = lazy(() =>
	initDB<DBTypes>('mummenschanz', [
		(db) => {
			const characterStore = db.createObjectStore('characters', { keyPath: 'id' });

			characterStore.createIndex('id_idx', 'id', { unique: true });
			characterStore.createIndex('updated_idx', 'updated');
		},
	]),
);

export async function listCharacters(system?: string) {
	if (!browser) return [];

	const db = await dbInstance();

	const characters = await db.getAllFromIndex('characters', 'updated_idx');

	return (system ? characters.filter((char) => char.system === system) : characters).reverse();
}

export async function saveCharacter<C extends VersionedCharacter>(character: C) {
	const db = await dbInstance();

	const result = await db.add('characters', Serialize(character));

	return result;
}

export async function deleteCharacter(id: string) {
	const db = await dbInstance();

	await db.delete('characters', id);
}

export async function loadCharacter(id: string) {
	const db = await dbInstance();

	const char = await db.getFromIndex('characters', 'id_idx', id);
	if (!char) throw new Error('Not Found'); // TODO: Error Page?

	if (!(char.system in SYSTEM_MAP)) throw new Error('Unknown System'); // TODO: Error Page?

	const system = (await SYSTEM_MAP[char.system]()).default;

	if (char.version > system.migrations.length) throw new Error('Unknown Version'); // TODO: Error Page?

	const w = writable(
		GenericDeserializeInto(
			migrateCharacter(char, system.migrations),
			system.character,
			new system.character(),
		),
	);

	const debouncedSave = debounce(async (v: VersionedCharacter) => {
		console.log('SAVE!!!');
		await db.put('characters', Serialize(v));
	}, 1000);

	w.subscribe(debouncedSave);

	// TODO: Fix this mess
	type SYSTEMS = typeof SYSTEM_MAP;
	type SYSTEM<P extends keyof SYSTEMS> = Awaited<ReturnType<SYSTEMS[P]>>['default'];
	type RETURN = {
		[Property in keyof SYSTEMS]: {
			character: Writable<SYSTEM<Property>['character']['prototype']>;
			Character: SYSTEM<Property>['character']['prototype'];
			SheetComponent: SYSTEM<Property>['page']['prototype'];
		};
	}[keyof SYSTEMS];

	return {
		character: w,
		Character: system.character,
		SheetComponent: system.page,
	} as unknown as RETURN;
}
