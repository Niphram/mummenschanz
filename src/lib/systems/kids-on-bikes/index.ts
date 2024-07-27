import type { SystemData } from '$lib/systems';

import { KidsOnBikesCharacter } from './character';
import { MIGRATION } from './migration';
import KidsOnBikesPage from './page.svelte';

export const KidsOnBikes = {
	character: KidsOnBikesCharacter,
	migrations: MIGRATION,
	page: KidsOnBikesPage,
} satisfies SystemData;
