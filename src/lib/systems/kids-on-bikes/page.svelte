<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { Proxied } from '$lib/systems';

	import type { KidsOnBikesCharacter } from './character';

	interface Props {
		c: Writable<Proxied<KidsOnBikesCharacter>>;
	}

	let { c }: Props = $props();
</script>

<h1>Kids on Bikes</h1>

<input bind:value={$c.name} />
