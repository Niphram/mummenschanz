<script lang="ts">
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import { withSign } from '$lib/utils';
	import { preventDefault } from '$lib/utils/prevent-default';
	import { char } from '../context';
	import { ABILITY_KEYS } from '../data/ability';
	import AbilityDialog from '../dialogs/ability-dialog.svelte';

	const { openDialog } = dialogContext();

	const c = char();

	interface Props {
		buttonClass?: string;
	}

	let { buttonClass = '' }: Props = $props();
</script>

{#each ABILITY_KEYS as key (key)}
	<button
		class="btn h-min min-w-16 grow p-0 {buttonClass}"
		oncontextmenu={preventDefault(() => openDialog(AbilityDialog, { c, ability: key }))}
	>
		<div class="flex w-full flex-col divide-y-2 divide-base-100 text-center">
			<div class="py-1 text-3xl font-extrabold">{withSign($c[key].mod())}</div>
			<div class="py-1 text-xs decoration-wavy" class:underline={!!$c[key].notes}>
				{$c[key].total()}
			</div>
			<div class="py-1 uppercase decoration-wavy" class:underline={!!$c[key].notes}>
				{key}
			</div>
		</div>
	</button>
{/each}
