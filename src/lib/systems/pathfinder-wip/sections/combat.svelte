<script lang="ts">
	import Collapse from '$lib/atoms/collapse.svelte';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import ChevronUpDown from '$lib/icons/chevron-up-down.svelte';
	import { withSign } from '$lib/utils';
	import { preventDefault } from '$lib/utils/prevent-default';
	import { char } from '../context';
	import { Attack } from '../data/attack';
	import AttackDialog from '../dialogs/attack-dialog.svelte';

	const c = char();
	const { openDialog } = dialogContext();
</script>

<button class="btn btn-primary" onclick={() => ($c.attacks.push(new Attack()), ($c = $c))}
	>ADD ATTACK (WIP)</button
>

<div class="grid-cols-[min-content repeat(4, auto)] grid w-full grid-flow-row justify-stretch">
	<div class="col-span-5 grid grid-cols-subgrid text-center text-xs text-neutral-500">
		<div></div>
		<div>Name</div>
		<div>Atk</div>
		<div>Crit Range</div>
		<div class="pr-12">Damage</div>
	</div>

	<SortableList
		class="col-span-5 grid grid-cols-subgrid gap-y-2"
		options={{
			group: 'attacks',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			fallbackOnBody: true,
			swapThreshold: 0.65,
		}}
		keyProp="id"
		bind:items={$c.attacks}
	>
		{#snippet item({ item: attack, index })}
			<div class="col-span-5 grid grid-cols-subgrid items-center">
				<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
					<ChevronUpDown class="size-6" />
				</div>

				<Collapse
					class="col-span-4 grid grid-cols-subgrid"
					titleClass="col-span-4 grid grid-cols-subgrid"
					icon="arrow"
					oncontextmenu={preventDefault(() => openDialog(AttackDialog, { c, idx: index }))}
				>
					{#snippet title(open)}
						<div class="col-span-4 grid grid-cols-subgrid items-center gap-x-2">
							<div
								class="text-ellipsis"
								class:overflow-hidden={!open}
								class:whitespace-nowrap={!open}
							>
								{attack.name}
							</div>
							<div class="text-center">{attack.attackMods().map(withSign).join('/')}</div>
							<div class="text-center">{'<critRange>'}</div>
							<div
								class="text-ellipsis text-center"
								class:overflow-hidden={!open}
								class:whitespace-nowrap={!open}
							>
								{'<damage>'}
							</div>
						</div>
					{/snippet}

					<div>Content</div>
				</Collapse>
			</div>
		{/snippet}
	</SortableList>
</div>
