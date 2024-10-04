import type { SystemData } from './system-data';

export const SYSTEM_MAP = {
	pathfinder: () => import('./pathfinder'),
	kids_on_bikes: () => import('./kids-on-bikes'),
	fate_condensed: () => import('./fate-condensed'),
	pathfinder_wip: () => import('./pathfinder-wip'),
} satisfies Record<string, () => Promise<{ default: SystemData }>>;

export type SystemName = keyof typeof SYSTEM_MAP;
