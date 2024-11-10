<script lang="ts">
	import type { Writable } from 'svelte/store';

	import type { Proxied } from '$lib/systems';

	import type { PathfinderCharacter } from './data/character';
	import LargeLayout from './layouts/large.svelte';
	// import MediumLayout from './layouts/medium.svelte';
	import SmallLayout from './layouts/small.svelte';
	import { setChar } from './context';

	let windowWidth: number = $state(0);
	let layout = $derived(
		windowWidth >= 1024 ? LargeLayout
			//: windowWidth >= 768 ? MediumLayout
		: SmallLayout,
	);

	interface Props {
		c: Writable<Proxied<PathfinderCharacter>>;
	}

	let { c }: Props = $props();
	setChar(c);

	const SvelteComponent = $derived(layout);
</script>

<svelte:window bind:innerWidth={windowWidth} />

<SvelteComponent />
