import { browser } from '$app/environment';
import { GenericDeserializeInto, Serialize } from 'cerialize';
import type { ComponentType, SvelteComponent } from 'svelte';
import { writable, type Writable } from 'svelte/store';

import { initDB } from '$lib/idb-store';
import {
	characterProxy,
	SYSTEM_MAP,
	type CharacterMigrationFn,
	type Proxied,
	type VersionedCharacter,
} from '$lib/systems';
import { debounce, lazy } from '$lib/utils';

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
	if (!char) throw new Error(`Not Found: ${id}`); // TODO: Error Page?

	if (!(char.system in SYSTEM_MAP)) throw new Error(`Unknown System: ${char.system}`); // TODO: Error Page?

	const system = (await SYSTEM_MAP[char.system]()).default;

	if (char.version > system.migrations.length) throw new Error(`Unknown Version: ${char.version}`); // TODO: Error Page?

	const deserializedChar = GenericDeserializeInto(
		migrateCharacter(char, system.migrations),
		system.character,
		new system.character(),
	);

	const debouncedSave = debounce(async (v: VersionedCharacter) => {
		await db.put('characters', Serialize(v));
	}, 1000);

	const proxy = characterProxy(deserializedChar, debouncedSave);

	const w = writable(proxy);

	type LoadedCharacter = {
		character: Writable<Proxied<VersionedCharacter>>;
		Character: new () => VersionedCharacter;
		SheetComponent: ComponentType<SvelteComponent<{ c: Writable<Proxied<VersionedCharacter>> }>>;
	};

	return {
		character: w,
		Character: system.character,
		SheetComponent: system.page,
	} as unknown as LoadedCharacter;
}
