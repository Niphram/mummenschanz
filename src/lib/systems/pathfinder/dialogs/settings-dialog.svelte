<script lang="ts">
	import type { Writable } from 'svelte/store';

	import { isDarkMode, toggleDarkMode } from '$lib/components/theme-changer.svelte';
	import type { Proxied } from '$lib/systems';

	import type { PathfinderCharacter } from '../data';

	export const title = '';

	export let c: Writable<Proxied<PathfinderCharacter>>;
</script>

<div class="flex flex-col gap-2">
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Dark Mode</span>
			<input type="checkbox" class="toggle" checked={$isDarkMode} on:change={toggleDarkMode} />
		</label>
	</div>

	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Use Persona System</span>
			<input type="checkbox" class="toggle" bind:checked={$c.settings.usePersonaSystem} />
		</label>
	</div>
</div>
