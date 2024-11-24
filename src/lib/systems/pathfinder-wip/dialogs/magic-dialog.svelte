<script lang="ts">
	import Divider from '$lib/atoms/divider.svelte';
	import IntegerInput from '$lib/atoms/integer-input.svelte';
	import MacroInput from '$lib/atoms/macro-input.svelte';
	import Select from '$lib/atoms/select.svelte';
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import { t } from '$lib/i18n';
	import type { Proxied } from '$lib/systems/character-proxy';
	import type { Writable } from 'svelte/store';
	import { ABILITY_KEYS } from '../data/ability';
	import type { PathfinderCharacter } from '../data/character';
	import { CASTING_TYPE, SPELL_LEVELS } from '../data/spell';

	interface Props {
		c: Writable<Proxied<PathfinderCharacter>>;
	}

	const { c }: Props = $props();
</script>

{#snippet spellDcConfig()}
	<div class="flex flex-col gap-2">
		<Divider>Spell DC</Divider>
		<div class="flex flex-row gap-2">
			<Select
				name="dcAbility"
				label="DC Ability"
				options={ABILITY_KEYS}
				bind:value={$c.spells.dcAbility}
			>
				{#snippet once()}
					<option value={undefined}>-</option>
				{/snippet}

				{#snippet children(option)}
					<option value={option}>{$t(`pathfinder_wip.ability.${option}.full`)}</option>
				{/snippet}
			</Select>

			<MacroInput name="dcBonus" label="DC Bonus" c={$c} bind:value={$c.spells.dcBonus.expr}
			></MacroInput>
		</div>
	</div>
{/snippet}

{#snippet spellSlotConfig()}
	<div
		class="grid grid-flow-row grid-cols-[max-content_repeat(3,auto)] items-center justify-center gap-2"
	>
		<p></p>
		<p class="text-center">Known</p>
		<p class="text-center">Per Day</p>
		<p class="text-center">Bonus</p>

		{#each SPELL_LEVELS as level (level)}
			<p>{$t(`pathfinder_wip.magic.spellLevel.${level}`)}</p>
			<IntegerInput name="level{level}known" min={0} small bind:value={$c.spells[level].known}
			></IntegerInput>
			<IntegerInput name="level{level}perDay" min={0} small bind:value={$c.spells[level].perDay}
			></IntegerInput>
			<IntegerInput name="level{level}bonus" min={0} small bind:value={$c.spells[level].perDayBonus}
			></IntegerInput>
		{/each}
	</div>
{/snippet}

<ResponsiveDialogBase>
	<div class="flex flex-col gap-2">
		<Select
			label="Casting Type"
			name="castingType"
			options={CASTING_TYPE}
			bind:value={$c.spells.castingType}
		>
			{#snippet children(option)}
				<option value={option}>{$t(`pathfinder_wip.magic.castingType.${option}`)}</option>
			{/snippet}
		</Select>

		{@render spellDcConfig()}

		{@render spellSlotConfig()}
	</div>
</ResponsiveDialogBase>
