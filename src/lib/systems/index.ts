import type { SystemData } from './system';

export const SYSTEM_MAP = {
	pathfinder: () => import('./pathfinder'),
	'kids-on-bikes': () => import('./kids-on-bikes'),
	'fate-condensed': () => import('./fate-condensed'),
} satisfies Record<string, () => Promise<{ default: SystemData }>>;

export type SystemName = keyof typeof SYSTEM_MAP;
