<script lang="ts">
	import DefaultLayout from '$lib/layouts/default-layout.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children: children_render }: Props = $props();
</script>

<DefaultLayout>
	{@render children_render?.()}
</DefaultLayout>
