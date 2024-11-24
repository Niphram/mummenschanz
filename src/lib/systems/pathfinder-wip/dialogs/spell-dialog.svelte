<script lang="ts">
	import type { Writable } from 'svelte/store';

	import TextInput from '$lib/atoms/text-input.svelte';
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import type { Proxied } from '$lib/systems/character-proxy';

	import type { PathfinderCharacter } from '../data/character';
	import { SpellDamage, type SpellLevel } from '../data/spell';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import { preventDefault } from '$lib/utils/prevent-default';
	import Button from '$lib/atoms/button.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import ChevronUpDown from '$lib/icons/chevron-up-down.svelte';
	import IntegerInput from '$lib/atoms/integer-input.svelte';
	import TextArea from '$lib/atoms/text-area.svelte';

	const { closeDialog } = dialogContext();

	interface Props {
		c: Writable<Proxied<PathfinderCharacter>>;
		level: SpellLevel;
		idx: number;
	}

	let { c, level: spellLevel, idx: spellIdx }: Props = $props();

	function deleteSpell() {
		closeDialog();
		$c.spells[spellLevel].splice(spellIdx, 1);
		$c = $c;
	}

	function addDamageToSpell() {
		$c.spells[spellLevel][spellIdx].damage.push(new SpellDamage());
		$c = $c;
	}

	function removeDamageFromSpell(damageIdx: number) {
		$c.spells[spellLevel][spellIdx].damage.splice(damageIdx, 1);
		$c = $c;
	}
</script>

{#snippet spellPreparationSection()}
	<div class="flex flex-col gap-2">
		<Divider>Preparation</Divider>
		<div class="grid grid-cols-2 gap-2">
			<IntegerInput
				label="Used today"
				min={0}
				name="used"
				bind:value={$c.spells[spellLevel][spellIdx].used}
			></IntegerInput>
			<IntegerInput
				label="Prepared today"
				min={0}
				name="prepared"
				bind:value={$c.spells[spellLevel][spellIdx].prepared}
			></IntegerInput>
		</div>
	</div>
{/snippet}

{#snippet spellDamageSection()}
	<div class="flex flex-col gap-2">
		<Divider class="h-min">
			Damage
			<button class="btn btn-secondary btn-xs" onclick={preventDefault(addDamageToSpell)}
				>Add</button
			>
		</Divider>

		<SortableList
			class="grid-cols-[min-content_repeat(2, auto) min-content] grid grid-flow-row gap-2"
			options={{
				group: 'spellDamage',
				handle: '.drag-handle',
				animation: 150,
				easing: 'cubic-bezier(1, 0, 0, 1)',
				fallbackOnBody: true,
				swapThreshold: 0.65,
			}}
			keyProp="id"
			bind:items={$c.spells[spellLevel][spellIdx].damage}
		>
			{#snippet empty()}
				<p class="w-full text-center text-sm text-primary-content text-opacity-50">
					No damage defined
				</p>
			{/snippet}

			{#snippet item({ index })}
				<div class="col-span-4 grid grid-cols-subgrid items-center">
					<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
						<ChevronUpDown class="size-6" />
					</div>
					<TextInput
						name="spellDamage"
						small
						placeholder="1d6"
						bind:value={$c.spells[spellLevel][spellIdx].damage[index].damage}
					></TextInput>
					<TextInput
						name="damageType"
						small
						placeholder="Fire"
						bind:value={$c.spells[spellLevel][spellIdx].damage[index].type}
					></TextInput>
					<Button
						color="warning"
						size="sm"
						onclick={preventDefault(() => removeDamageFromSpell(index))}
					>
						Delete
					</Button>
				</div>
			{/snippet}
		</SortableList>
	</div>
{/snippet}

<ResponsiveDialogBase title="Spell">
	<div class="flex flex-col gap-4">
		{#if $c.spells[spellLevel][spellIdx]}
			<TextInput label="Name" name="name" bind:value={$c.spells[spellLevel][spellIdx].name}
			></TextInput>

			{@render spellPreparationSection()}

			{@render spellDamageSection()}

			<TextArea
				name="spellDescription"
				maxlength={500}
				rows={10}
				label="Description"
				bind:value={$c.spells[spellLevel][spellIdx].notes}
			></TextArea>

			<Button color="error" class="uppercase" onclick={() => deleteSpell()}>Delete</Button>
		{/if}
	</div>
</ResponsiveDialogBase>
