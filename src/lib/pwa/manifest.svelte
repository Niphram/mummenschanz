<script lang="ts">
	import { page } from '$app/stores';
	import { listCharacters } from '$lib/character-store';
	import type { VersionedCharacter } from '$lib/systems';

	const STATIC_MANIFEST = {
		name: 'Mummenschanz',
		short_name: 'Mummenschanz',
		description: 'Your digital multi-system charactersheet',
		theme_color: '#DBCA9A',
		background_color: '#ECE3CA',
		display: 'standalone',
		scope: `${$page.url.origin}/`,
		start_url: `${$page.url.origin}/`,
		id: 'mummenschanz',
		icons: [
			{
				src: `${$page.url.origin}/icons/512.png`,
				type: 'image/png',
				sizes: '512x512',
			},
			{
				src: `${$page.url.origin}/icons/192.png`,
				type: 'image/png',
				sizes: '192x192',
			},
		],
	};

	let characterList = $state(listCharacters());

	function createManifest(characters: VersionedCharacter[]) {
		const shortcuts = characters.slice(0, 3).map((c) => ({
			name: c.name,
			url: `${$page.url.origin}/character?id=${c.id}`,
		}));

		const combinedManifest = { ...STATIC_MANIFEST, shortcuts };

		console.log(combinedManifest);

		return `data:application/manifest+json,${encodeURIComponent(JSON.stringify(combinedManifest))}`;
	}
</script>

<svelte:head>
	{#await characterList then characters}
		<link rel="manifest" href={createManifest(characters)} />
	{/await}
</svelte:head>
