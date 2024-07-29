<script lang="ts">
	import { base } from '$app/paths';

	import Divider from '$lib/atoms/divider.svelte';
	import Icon from '$lib/atoms/icon.svelte';
	import { deleteCharacter, listCharacters } from '$lib/character-store';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import CreateCharacterDialog from '$lib/dialogs/create-character-dialog.svelte';
	import { t } from '$lib/i18n';

	const { openDialog } = dialogContext();

	let selectedSystem: string | undefined;

	$: characterList = listCharacters(selectedSystem);

	async function deleteChar(id: string) {
		await deleteCharacter(id);

		characterList = listCharacters(selectedSystem);
	}
</script>

<div class="flex min-h-screen flex-col items-stretch gap-4">
	<div class="sticky top-0 z-40 flex w-full flex-col bg-base-200 drop-shadow-xl">
		<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
			<p class="text-lg font-bold">Mummenschanz (Work in Progress)</p>
		</div>
	</div>

	<div class="flex grow flex-col items-center gap-2 p-4">
		<button class="btn btn-primary" on:click={() => openDialog(CreateCharacterDialog, {})}>
			<Icon type="Add" class="size-6" />
			Create new Character
		</button>

		<Divider>Saved Characters</Divider>

		<div class="flex w-full max-w-2xl flex-col gap-4">
			{#await characterList}
				<div class="loading loading-dots loading-lg" />
			{:then characters}
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
			{/await}
		</div>
	</div>

	<footer class="footer items-center gap-y-4 self-end bg-neutral p-4 text-neutral-content">
		<aside class="grid-flow-col items-center">
			<p>&copy; 2024 Niphram - All right reserved</p>
		</aside>
		<nav class="grid-flow-col gap-4 md:self-center md:justify-self-end">
			<a href="{base}/privacy" class="link">Privacy Policy</a>
			<a href="https://github.com/Niphram/mummenschanz" class="link">Github</a>
		</nav>
	</footer>
</div>
