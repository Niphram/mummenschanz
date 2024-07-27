import type { SystemData } from '$lib/systems';

import { PATHFINDER_CHAR_MIGRATIONS, PathfinderCharacter } from './data';
import Page from './page.svelte';

export const Pathfinder = {
	character: PathfinderCharacter,
	migrations: PATHFINDER_CHAR_MIGRATIONS,
	page: Page,
} satisfies SystemData;
