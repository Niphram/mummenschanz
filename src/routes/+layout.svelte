<script lang="ts">
	import '../app.css';

	import Dialog from '$lib/components/dialog.svelte';
	import ThemeChanger from '$lib/components/theme-changer.svelte';
</script>

<ThemeChanger>
	<Dialog />

	<div class="min-h-screen w-screen">
		<slot />
	</div>
</ThemeChanger>
