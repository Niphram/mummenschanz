import type { ComponentType, SvelteComponent } from 'svelte';
import type { Writable } from 'svelte/store';

import type { CharacterMigrationFn, VersionedCharacter } from './versioned-character';
import type { Proxied } from './character-proxy';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SystemData<C extends VersionedCharacter = any> = {
	character: new () => C;
	migrations: CharacterMigrationFn[];
	page: ComponentType<SvelteComponent<{ c: Writable<Proxied<C>> }>>;
};
