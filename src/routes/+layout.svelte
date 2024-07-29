<script lang="ts">
	import '../app.css';

	import DialogProvider from '$lib/components/dialog-provider.svelte';
	import ThemeChanger from '$lib/components/theme-changer.svelte';
</script>

<div class="select-none">
	<ThemeChanger>
		<DialogProvider>
			<div class="min-h-screen w-screen">
				<slot />
			</div>
		</DialogProvider>
	</ThemeChanger>
</div>
