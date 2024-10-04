<script lang="ts">
	import { base } from '$app/paths';

	import Divider from '$lib/atoms/divider.svelte';
	import Icon from '$lib/atoms/icon.svelte';
	import Loader from '$lib/atoms/loader.svelte';
	import { deleteCharacter, listCharacters } from '$lib/character-store';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import ConfirmDialog from '$lib/dialogs/confirm-dialog.svelte';
	import CreateCharacterDialog from '$lib/dialogs/create-character-dialog.svelte';
	import { t } from '$lib/i18n';
	import { fade } from 'svelte/transition';

	const { openDialog } = dialogContext();

	let selectedSystem: string | undefined;

	$: characterList = listCharacters(selectedSystem);

	async function deleteChar(id: string) {
		openDialog(ConfirmDialog, {
			title: 'Delete?',
			message: 'Do you really want to delete the character?',
			onConfirm: async () => {
				await deleteCharacter(id);

				characterList = listCharacters(selectedSystem);
			},
		});
	}
</script>

<div role="alert" class="alert alert-info mb-4">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		class="h-6 w-6 shrink-0 stroke-current"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
		></path>
	</svg>
	<span
		>This application is nowhere near usable. Therefore, you should not use it for anything but
		experimentation.</span
	>
</div>

{#await characterList}
	<div class="flex grow flex-row gap-2">
		<Loader />
	</div>
{:then characters}
	<div in:fade class="flex max-w-full flex-col">
		<button class="btn btn-primary" on:click={() => openDialog(CreateCharacterDialog, {})}>
			<Icon type="Add" class="size-6" />
			Create new Character
		</button>

		<Divider>Saved Characters</Divider>

		<div class="flex w-full max-w-2xl grow flex-col gap-4">
			{#each characters as char}
				<div class="flex grow flex-row gap-2">
					<a
						class="btn flex min-w-0 shrink grow flex-row flex-nowrap text-left"
						href="{base}/character?id={char.id}"
					>
						<div class="flex-auto truncate sm:text-lg">
							{char.name || $t('general.character.unnamed_character')}
						</div>
						<span
							class="badge badge-info badge-sm justify-self-end whitespace-nowrap uppercase sm:badge-md"
						>
							{$t(`${char.system}.system_name`)}
						</span>
					</a>

					<button on:click={() => deleteChar(char.id)} class="btn-xl btn btn-warning">
						Delete
					</button>
				</div>
			{:else}
				<p class="text-center">No characters found, create one!</p>
			{/each}
		</div>
	</div>
{/await}
