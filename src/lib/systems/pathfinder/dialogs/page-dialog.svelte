<script lang="ts">
	import { base } from '$app/paths';
	import type { Writable } from 'svelte/store';

	import DialogBase from '$lib/components/responsive-dialog-base.svelte';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import type { Proxied } from '$lib/systems';

	import type { PathfinderCharacter } from '../data';
	import SettingsDialog from './settings-dialog.svelte';

	const { openDialog } = dialogContext();

	const pages = [{ key: 'character', enabled: true }] as const;

	export let c: Writable<Proxied<PathfinderCharacter>>;
</script>

<DialogBase let:closeDialog>
	<div class="flex h-full flex-col gap-2">
		{#each pages as { key, enabled } (key)}
			{#if enabled}
				<a href="#{key}" class="btn w-full" on:click={closeDialog}>{key}</a>
			{/if}
		{/each}

		<div class="divider">Options</div>

		<button
			class="btn btn-outline btn-accent w-full"
			on:click={() => openDialog(SettingsDialog, { c })}
		>
			Settings
		</button>

		<a href="{base}/" class="btn btn-neutral w-full" on:click={closeDialog}>Exit</a>
	</div>
</DialogBase>
