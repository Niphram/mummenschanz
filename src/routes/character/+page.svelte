<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';

	import { loadCharacter } from '$lib/character-store';

	let id: string | null;
	beforeUpdate(() => {
		id = $page.url.searchParams.get('id');

		if (!id) {
			goto(`${base}/`);
		}
	});
</script>

{#if id}
	{#await loadCharacter(id)}
		loading
	{:then data}
		<svelte:component this={data.SheetComponent} c={data.character} />
	{/await}
{/if}
