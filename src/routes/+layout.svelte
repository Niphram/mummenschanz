<script lang="ts">
	import '../app.css';

	import DialogProvider from '$lib/components/dialog-provider.svelte';
	import ThemeChanger from '$lib/components/theme-changer.svelte';

	import { onNavigate } from '$app/navigation';

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

<div class="contents select-none">
	<ThemeChanger>
		<DialogProvider>
			<slot />
		</DialogProvider>
	</ThemeChanger>
</div>
