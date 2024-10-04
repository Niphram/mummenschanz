import type { SystemData } from '$lib/systems/system-data';

import { PathfinderCharacter } from './data/character';
import { MIGRATION } from './migration';
import PathfinderPage from './page.svelte';

export default {
	character: PathfinderCharacter,
	migrations: MIGRATION,
	page: PathfinderPage,
} satisfies SystemData;
