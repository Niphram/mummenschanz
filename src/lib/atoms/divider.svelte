<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children: children_render }: Props = $props();
</script>

<div class="divider my-0">
	{@render children_render?.()}
</div>
