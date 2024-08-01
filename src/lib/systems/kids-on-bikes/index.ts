import type { SystemData } from '$lib/systems/system-data';

import { KidsOnBikesCharacter } from './character';
import { MIGRATION } from './migration';
import KidsOnBikesPage from './page.svelte';

export default {
	character: KidsOnBikesCharacter,
	migrations: MIGRATION,
	page: KidsOnBikesPage,
} satisfies SystemData;
