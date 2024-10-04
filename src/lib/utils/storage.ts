import { browser } from '$app/environment';
import { readonly, writable } from 'svelte/store';

const SUFFIXES = [
	'B',
	'KB', // 3
	'MB', // 6
	'GB',
	'TB',
	'PB',
];

export function bytes(b: number) {
	if (b <= 0) return `0 ${SUFFIXES[0]}`;

	const idx = Math.floor(Math.log10(b) / 3);

	return `${(b / Math.pow(1000, idx)).toFixed(2)} ${SUFFIXES[idx]}`;
}

type Storage = {
	loading: boolean;
	error: boolean;
	quota: number;
	usage: number;
};

const storageStore = writable<Storage>(
	{ loading: true, error: false, quota: 0, usage: 0 },
	(set) => {
		if (browser && 'storage' in navigator) {
			navigator.storage
				.estimate()
				.then((estimate) => {
					set({
						loading: false,
						error: false,
						quota: estimate.quota ?? 0,
						usage: estimate.usage ?? 0,
					});
				})
				.catch(() => {
					set({
						loading: false,
						error: true,
						quota: 0,
						usage: 0,
					});
				});
		} else {
			set({
				loading: false,
				error: true,
				quota: 0,
				usage: 0,
			});
		}
	},
);

export const storage = readonly(storageStore);
