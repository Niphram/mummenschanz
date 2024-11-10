<script lang="ts">
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import type { Proxied } from '$lib/systems/character-proxy';
	import type { Writable } from 'svelte/store';
	import type { PathfinderCharacter } from '../data/character';
	import type { AbilityKey } from '../data/ability';
	import MacroInput from '$lib/atoms/macro-input.svelte';

	export let c: Writable<Proxied<PathfinderCharacter>>;
	export let ability: AbilityKey;
</script>

<ResponsiveDialogBase title="Ability">
	<MacroInput c={$c} label="Base" name="base" bind:value={$c[ability].base.expr} />
</ResponsiveDialogBase>
