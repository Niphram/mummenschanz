<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { saveCharacter } from '$lib/character-store';
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import { t } from '$lib/i18n';
	import { SYSTEM_MAP, type SystemName } from '$lib/systems';

	async function createAndOpenCharacter(system: SystemName) {
		saveCharacter(new (await SYSTEM_MAP[system]()).default.character()).then((id) =>
			goto(`${base}/character?id=${id}`),
		);
	}
</script>

<ResponsiveDialogBase title={$t('general.dialogs.character_create.title')}>
	<div class="flex flex-col gap-4">
		<div class="divider">{$t('general.dialogs.character_create.message')}</div>

		<div class="flex h-full flex-col gap-2">
			{#each Object.keys(SYSTEM_MAP) as system}
				<button class="btn btn-primary" onclick={() => createAndOpenCharacter(system)}>
					{$t(`${system}.system_name`)}
				</button>
			{/each}
		</div>
	</div>
</ResponsiveDialogBase>
