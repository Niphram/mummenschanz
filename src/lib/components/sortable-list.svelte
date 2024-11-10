<script lang="ts" module>
	// Needed to satisfy eslint
	type T = unknown;

	export const listMap = new WeakMap<HTMLElement, unknown[]>();
</script>

<script lang="ts" generics="T">
	import Sortable from 'sortablejs';
	import { onMount, type Snippet } from 'svelte';

	type Options = Omit<
		Sortable.SortableOptions,
		'onUpdate' | 'onAdd' | 'onRemove' | 'onMove' | 'onChoose' | 'disabled'
	>;

	interface Props {
		items: T[];
		keyProp: keyof T;
		keyPrefix?: string;
		options?: Options;
		disabled?: boolean;
		class?: string;
		element?: string;
		onMove?: ((item: T, targetArray: T[]) => boolean) | undefined;
		item?: Snippet<[{ item: T; index: number }]>;
		empty?: Snippet;
	}

	let {
		items = $bindable(),
		keyProp,
		keyPrefix = '',
		options = undefined,
		disabled = false,
		class: className = '',
		element = 'div',
		onMove = undefined,
		item: item_render,
		empty: empty_render,
	}: Props = $props();

	let listEl: HTMLElement;

	let sortableInstance: Sortable | undefined = $state();

	// Update 'disabled' if it changes
	$effect(() => {
		sortableInstance?.option('disabled', disabled);
	});

	// The that was selected last
	let lastSelectedItem: T;

	onMount(() => {
		listMap.set(listEl, items);

		sortableInstance = Sortable.create(listEl, {
			onUpdate({ oldIndex = 0, newIndex = 0 }) {
				items.splice(newIndex, 0, items.splice(oldIndex, 1)[0]);
				items = items;
			},
			onAdd({ oldIndex = 0, newIndex = 0, from }) {
				const list = listMap.get(from) as T[];
				if (list) {
					items.splice(newIndex, 0, list[oldIndex]);
					items = items;
				}
			},
			onRemove({ oldIndex = 0 }) {
				items.splice(oldIndex, 1);
				items = items;
			},
			onMove({ to }) {
				const targetList = listMap.get(to) as T[];
				return onMove?.(lastSelectedItem, targetList);
			},
			onChoose({ oldIndex = 0 }) {
				lastSelectedItem = items[oldIndex];
			},
			disabled,
			...options,
		});

		return () => {
			listMap.delete(listEl);
			sortableInstance?.destroy();
		};
	});
</script>

<svelte:element this={element} class={className} bind:this={listEl}>
	{#each items as item, index (keyPrefix + item[keyProp])}
		{@render item_render?.({ item, index })}
	{/each}

	{#if items.length === 0}
		{@render empty_render?.()}
	{/if}
</svelte:element>
