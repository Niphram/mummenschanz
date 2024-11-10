<script lang="ts">
	import type { Writable } from 'svelte/store';

	import Select from '$lib/atoms/select.svelte';
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import type { Proxied } from '$lib/systems/character-proxy';

	import { ABILITY_KEYS } from '../data/ability';
	import { ATTACK_BASE } from '../data/attack';
	import type { PathfinderCharacter } from '../data/character';

	interface Props {
		c: Writable<Proxied<PathfinderCharacter>>;
		idx: number;
	}

	let { c, idx }: Props = $props();
</script>

{#snippet once()}
	<option value={undefined}>None</option>
{/snippet}

<ResponsiveDialogBase title="Attack">
	<h1>WIP</h1>
	<Select
		name="attackBase"
		label="Base"
		options={ATTACK_BASE}
		bind:value={$c.attacks[idx].attackBase}
		{once}
	>
		{#snippet children(option)}
			<option value={option}>{option}</option>
		{/snippet}
	</Select>
	<Select
		name="attackAbility"
		label="Ability"
		options={ABILITY_KEYS}
		bind:value={$c.attacks[idx].attackAbility}
		{once}
	>
		{#snippet children(option)}
			<option value={option}>{option}</option>
		{/snippet}
	</Select>
</ResponsiveDialogBase>
