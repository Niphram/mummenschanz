<script lang="ts">
	import '../app.css';

	import { onNavigate } from '$app/navigation';
	import type { Snippet } from 'svelte';

	import DialogProvider from '$lib/components/dialog-provider.svelte';
	import ThemeChanger from '$lib/components/theme-changer.svelte';
	import Manifest from '$lib/pwa/manifest.svelte';

	interface Props {
		children?: Snippet;
	}

	let { children: children_render }: Props = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<Manifest />

<div class="contents select-none">
	<ThemeChanger>
		<DialogProvider>
			{@render children_render?.()}
		</DialogProvider>
	</ThemeChanger>
</div>
