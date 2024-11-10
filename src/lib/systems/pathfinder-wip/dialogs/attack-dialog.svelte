<script lang="ts">
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import type { Proxied } from '$lib/systems/character-proxy';
	import type { Writable } from 'svelte/store';
	import type { PathfinderCharacter } from '../data/character';
	import Select from '$lib/atoms/select.svelte';
	import { ATTACK_BASE } from '../data/attack';
	import { ABILITY_KEYS } from '../data/ability';

	export let c: Writable<Proxied<PathfinderCharacter>>;
	export let idx: number;
</script>

<ResponsiveDialogBase title="Attack">
	<h1>WIP</h1>
	<Select
		name="attackBase"
		label="Base"
		options={ATTACK_BASE}
		bind:value={$c.attacks[idx].attackBase}
		let:option
	>
		<option slot="once" value={undefined}>None</option>
		<option value={option}>{option}</option>
	</Select>
	<Select
		name="attackAbility"
		label="Ability"
		options={ABILITY_KEYS}
		bind:value={$c.attacks[idx].attackAbility}
		let:option
	>
		<option slot="once" value={undefined}>None</option>
		<option value={option}>{option}</option>
	</Select>
</ResponsiveDialogBase>
