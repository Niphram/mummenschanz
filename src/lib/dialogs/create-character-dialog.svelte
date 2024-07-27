<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { saveCharacter } from '$lib/character-store';
	import DialogBase from '$lib/components/dialog-base.svelte';
	import { SYSTEM_MAP, type SystemName } from '$lib/systems';

	async function createAndOpenCharacter(system: SystemName) {
		saveCharacter(new (await SYSTEM_MAP[system]()).default.character()).then((id) =>
			goto(`${base}/character?id=${id}`),
		);
	}
</script>

<DialogBase title="Select a system">
	<div class="flex flex-col gap-4">
		<div class="divider">Select a system</div>

		<div class="flex h-full flex-col gap-2">
			{#each Object.keys(SYSTEM_MAP) as system}
				<button class="btn btn-primary" on:click={() => createAndOpenCharacter(system)}>
					{system}
				</button>
			{/each}
		</div>
	</div>
</DialogBase>
