<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children: children_render }: Props = $props();
</script>

<div class="z-40 flex w-full flex-row bg-base-200 p-2 drop-shadow-xl">
	{@render children_render?.()}
</div>
