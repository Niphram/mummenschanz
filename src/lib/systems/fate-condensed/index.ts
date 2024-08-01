import type { SystemData } from '$lib/systems/system-data';

import { FATE_CONDENSED_CHAR_MIGRATIONS, FateCondensedCharacter } from './character';
import FateCondensedPage from './page.svelte';

export default {
	character: FateCondensedCharacter,
	migrations: FATE_CONDENSED_CHAR_MIGRATIONS,
	page: FateCondensedPage,
} satisfies SystemData;
