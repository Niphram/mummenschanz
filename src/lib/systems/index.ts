import type { SystemData } from './system';

import { FateCondensed } from './fate-condensed';
import { KidsOnBikes } from './kids-on-bikes';
import { Pathfinder } from './pathfinder';

export const SYSTEM_MAP = {
	pathfinder: Pathfinder,
	'kids-on-bikes': KidsOnBikes,
	'fate-condensed': FateCondensed,
} satisfies Record<string, SystemData>;

export type SystemName = keyof typeof SYSTEM_MAP;
