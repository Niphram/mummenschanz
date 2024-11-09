<script lang="ts">
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import type { Proxied } from '$lib/systems/character-proxy';
	import type { Writable } from 'svelte/store';
	import type { PathfinderCharacter } from '../data/character';

	export let c: Writable<Proxied<PathfinderCharacter>>;
	export let idx: number;
</script>

<ResponsiveDialogBase title="Attack">
	<h1>WIP</h1>
	<input name="base" bind:value={$c.attacks[idx].attackBase} />
	<input name="ability" bind:value={$c.attacks[idx].attackAbility} />
</ResponsiveDialogBase>
