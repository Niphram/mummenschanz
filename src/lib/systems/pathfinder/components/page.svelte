<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { PathfinderCharacter } from '../data';

	interface Props {
		character: Writable<PathfinderCharacter>;
	}

	let { character }: Props = $props();
</script>

<h1>Pathfinder</h1>

<input bind:value={$character.name} />
