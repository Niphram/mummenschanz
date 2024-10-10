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
	import Persona from '../sections/persona.svelte';

	const { openDialog } = dialogContext();

	const c = char();
</script>

<div class="sticky left-0 right-0 top-0">
	<Header>
		<NameButton></NameButton>
	</Header>
</div>

<div class="flex w-screen flex-row justify-center p-4">
	<div class="flex w-full max-w-6xl flex-col">
		<div class="w-full">
			<div class="flex flex-1 grow flex-row justify-stretch gap-2">
				<AbilityButtons />

				<HP on:click={() => openDialog(HpDialog, { c })} />

				<div>Conditions?</div>
			</div>
		</div>

		<div class="flex flex-row justify-stretch gap-4">
			<div class="relative grow overflow-y-auto">
				<div class="flex h-0 min-h-full flex-col gap-1">
					<p>Some</p>
					<p>Other</p>
					<p>Stuff</p>
					<p>Some</p>
					<p>Other</p>
					<p>Stuff</p>
					<p>Some</p>
					<p>Other</p>
					<p>Stuff</p>
				</div>
			</div>

			<div class="flex grow flex-col gap-1">
				<Skills />
			</div>

			<div class="relative overflow-y-auto rounded-box border border-solid border-base-content p-4">
				<div class="flex h-0 min-h-full flex-col gap-1">
					<TabContainer
						tabs={[
							{ label: 'Combat', component: Combat },
							{ label: 'Spells', component: Spells },
							{ label: 'Inventory', component: Inventory },
							$c.persona.enabled && { label: 'Persona', component: Persona },
						].filter((tab) => !!tab)}
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<button on:click={() => openDialog(ConfigDialog, { c })}>CONFIG</button>
