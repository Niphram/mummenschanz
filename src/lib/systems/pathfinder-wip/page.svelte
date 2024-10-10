<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { Proxied } from '$lib/systems';

	import type { PathfinderCharacter } from './data/character';
	import LargeLayout from './layouts/large.svelte';
	// import MediumLayout from './layouts/medium.svelte';
	import SmallLayout from './layouts/small.svelte';
	import { setChar } from './context';

	let windowWidth: number;
	$: layout =
		windowWidth >= 1024 ? LargeLayout
			//: windowWidth >= 768 ? MediumLayout
		: SmallLayout;

	export let c: Writable<Proxied<PathfinderCharacter>>;
	setChar(c);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<svelte:component this={layout} />
