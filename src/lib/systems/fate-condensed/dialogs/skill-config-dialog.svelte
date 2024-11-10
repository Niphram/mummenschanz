<script lang="ts">
	import type { Writable } from 'svelte/store';

	import Divider from '$lib/atoms/divider.svelte';
	import IntegerInput from '$lib/atoms/integer-input.svelte';
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import { t } from '$lib/i18n';
	import ChevronUpDown from '$lib/icons/chevron-up-down.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Trash from '$lib/icons/trash.svelte';
	import type { Proxied } from '$lib/systems';
	import { preventDefault } from '$lib/utils/prevent-default';

	import { Skill, type FateCondensedCharacter } from '../character';

	interface Props {
		c: Writable<Proxied<FateCondensedCharacter>>;
	}

	let { c }: Props = $props();

	function removeSkill(index: number) {
		$c.skills.splice(index, 1);
		$c.skills = $c.skills;
	}

	function addSkill() {
		$c.skills.push(new Skill(''));
		$c.skills = $c.skills;
	}
</script>

<ResponsiveDialogBase title={$t('fate_condensed.skills_config')}>
	<SortableList
		class="mb-8 flex flex-col items-center gap-2"
		options={{
			group: `skills`,
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
		}}
		bind:items={$c.skills}
		keyProp="id"
	>
		{#snippet empty()}
			<div>{$t('fate_condensed.no_skills')}</div>
		{/snippet}

		{#snippet item({ index })}
			<div class="flex w-full flex-row gap-2">
				<div
					class="drag-handle ml-2 flex w-6 items-center justify-center"
					role="button"
					tabindex="0"
				>
					<ChevronUpDown class="size-6" />
				</div>

				<div class="form-control w-full">
					<input
						name="name"
						placeholder={$t('fate_condensed.unnamed_skill')}
						class="input input-sm input-bordered w-full"
						bind:value={$c.skills[index].name}
					/>
				</div>

				<div class="w-32">
					<IntegerInput name="bonus" min={0} max={10} bind:value={$c.skills[index].bonus} small />
				</div>

				<button
					class="btn btn-square btn-warning btn-sm text-warning-content"
					onclick={preventDefault(() => removeSkill(index))}
				>
					<Trash class="size-4" />
				</button>
			</div>
		{/snippet}
	</SortableList>

	<Divider>
		<button class="btn btn-circle btn-primary btn-sm" onclick={preventDefault(addSkill)}>
			<Plus class="size-6" />
		</button>
	</Divider>
</ResponsiveDialogBase>
