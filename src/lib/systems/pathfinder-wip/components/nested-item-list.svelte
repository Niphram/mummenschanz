<script lang="ts">
	import Collapse from '$lib/atoms/collapse.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import DragHandle from '$lib/icons/drag-handle.svelte';
	import { unproxy, type Proxied } from '$lib/systems/character-proxy';
	import { char } from '../context';
	import type { Item } from '../data/item';

	const c = char();

	export let items: Proxied<Item>[];

	let className: string = '';
	export { className as class };

	export let disabled = false;

	export let parentId = 'items';

	// If the moved item is a container and the target is another container, block move
	function onMove(item: Proxied<Item>, target: Proxied<Item>[]) {
		return !item.isContainer || unproxy(target) === unproxy($c.items);
	}
</script>

<SortableList
	bind:items
	keyPrefix={parentId}
	options={{
		group: 'items',
		handle: '.drag-handle',
		animation: 150,
		easing: 'cubic-bezier(1, 0, 0, 1)',
		fallbackOnBody: true,
		swapThreshold: 0.65,
	}}
	{onMove}
	keyProp="id"
	{disabled}
	class="flex flex-col gap-2 {className}"
	let:item
	let:index
>
	<div slot="fallback" class="text-center">No items</div>

	<div class="flex w-full flex-auto flex-row">
		<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
			<DragHandle />
		</div>

		{#if !item.isContainer}
			<button class="btn btn-sm min-w-0 flex-auto truncate md:btn-md">
				<span class="truncate">
					{item.quantity}x {item.name}
				</span>
			</button>
		{:else}
			<Collapse icon="arrow" let:open>
				<svelte:fragment slot="title">
					<span class="text-sm font-semibold" class:underline={item.equipped}>
						{item.name}
					</span>
					<span class="badge badge-md">
						ITEMS {item.contents.length}
					</span>
				</svelte:fragment>

				<svelte:self
					bind:items={items[index].contents}
					parentId={item.id}
					disabled={!open}
					class="rounded-lg bg-base-100 p-2 pl-0"
				/>
			</Collapse>
		{/if}
	</div>
</SortableList>
