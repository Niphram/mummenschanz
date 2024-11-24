<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		children?: Snippet;
	}

	let { class: className = '', children: children_render }: Props = $props();
</script>

<div class="divider my-0 {className}">
	{@render children_render?.()}
</div>
