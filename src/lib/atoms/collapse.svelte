<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	interface Props {
		open?: boolean;
		icon?: 'arrow' | 'plus' | undefined;
		class?: string;
		titleClass?: string;
		contentClass?: string;
		oncontextmenu?: MouseEventHandler<HTMLDivElement>;
		title?: Snippet<[open: boolean]>;
		children?: Snippet<[open: boolean]>;
	}

	let {
		open = $bindable(false),
		icon = undefined,
		class: className = '',
		titleClass = '',
		contentClass = '',
		oncontextmenu,
		title: title_render,
		children: children_render,
	}: Props = $props();

	function toggleOpen() {
		open = !open;
	}

	function keydownHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
		} else if (event.code === 'Enter') {
			event.preventDefault();
			toggleOpen();
		}
	}

	function keyupHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
			toggleOpen();
		}
	}
</script>

<div
	class="collapse bg-base-200 text-left {className}"
	class:collapse-arrow={icon === 'arrow'}
	class:collapse-plus={icon === 'plus'}
	class:collapse-open={open}
	class:collapse-close={!open}
	onclick={toggleOpen}
	{oncontextmenu}
	onkeydown={keydownHandler}
	onkeyup={keyupHandler}
	role="button"
	tabindex="0"
>
	{#if title_render}
		<div class="collapse-title h-min min-h-0 py-2 {titleClass}" class:pe-4={!icon}>
			{@render title_render(open)}
		</div>
	{/if}

	<div class="collapse-content min-w-0 {contentClass}">
		{@render children_render?.(open)}
	</div>
</div>

<style>
	.collapse-arrow > .collapse-title::after {
		top: 50%;
	}
</style>
