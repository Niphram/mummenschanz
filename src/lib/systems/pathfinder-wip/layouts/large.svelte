<script lang="ts">
	import Header from '$lib/atoms/header.svelte';
	import TabContainer from '$lib/components/tab-container.svelte';
	import AbilityButtons from '../components/ability-buttons.svelte';
	import NameButton from '../components/name-button.svelte';
	import Spells from '../sections/spells.svelte';
	import Inventory from '../sections/inventory.svelte';
	import Combat from '../sections/combat.svelte';
	import ConfigDialog from '../dialogs/config-dialog.svelte';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import { char } from '../context';
	import Skills from '../sections/skills.svelte';
	import HP from '../sections/hp.svelte';
	import HpDialog from '../dialogs/hp-dialog.svelte';

	const { openDialog } = dialogContext();

	const c = char();
</script>

<div class="sticky left-0 right-0 top-0">
	<Header>
		<NameButton></NameButton>
	</Header>
</div>

<div class="flex flex-row justify-center">
	<div class="flex w-full max-w-4xl flex-col">
		<div class="w-full max-w-4xl">
			<div class="flex flex-1 grow flex-row justify-stretch gap-2">
				<AbilityButtons />

				<HP on:click={() => openDialog(HpDialog, { c })} />

				<div>Conditions?</div>
			</div>
		</div>

		<div class="flex flex-row">
			<div>
				<Skills />
			</div>

			<div class="grow">
				<TabContainer
					tabs={[
						{ label: 'Combat', component: Combat },
						{ label: 'Spells', component: Spells },
						{ label: 'Inventory', component: Inventory },
					]}
				/>
			</div>
		</div>
	</div>
</div>

<button on:click={() => openDialog(ConfigDialog, { c })}>CONFIG</button>
