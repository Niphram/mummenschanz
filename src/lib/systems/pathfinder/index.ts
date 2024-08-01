import type { SystemData } from '$lib/systems/system-data';

import { PATHFINDER_CHAR_MIGRATIONS, PathfinderCharacter } from './data';
import Page from './page.svelte';

export default {
	character: PathfinderCharacter,
	migrations: PATHFINDER_CHAR_MIGRATIONS,
	page: Page,
} satisfies SystemData;
