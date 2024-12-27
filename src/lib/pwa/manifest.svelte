<script lang="ts">
	import { listCharacters } from '$lib/character-store';
	import type { VersionedCharacter } from '$lib/systems';

	import STATIC_MANIFEST from './manifest.json';

	let characterList = $state(listCharacters());

	function createManifest(characters: VersionedCharacter[]) {
		const shortcuts = characters.slice(0, 3).map((c) => ({
			name: c.name,
			url: `/character?id=${c.id}`,
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
