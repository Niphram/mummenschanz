<script lang="ts">
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import { withSign } from '$lib/utils';
	import { char } from '../context';
	import HpDialog from '../dialogs/hp-dialog.svelte';

	const { openDialog } = dialogContext();

	const c = char();

	let staggered = $derived($c.hp.non_lethal === $c.hp.current() + $c.hp.temp);
	let unconscious = $derived($c.hp.non_lethal > $c.hp.current() + $c.hp.temp);
</script>

<button
	class="btn h-auto max-h-none px-2 py-0 md:w-40"
	class:bg-orange-500={staggered}
	class:bg-red-500={unconscious}
	onclick={() => openDialog(HpDialog, { c })}
>
	<div
		class="flex w-full flex-row divide-x-2 divide-base-100 text-center md:flex-col md:divide-x-0 md:divide-y-2"
	>
		<div class="flex flex-col justify-center pr-2 md:pb-2 md:pr-0">
			<span class="md:text-md text-xs">Hit Points</span>
			<div class="text-md flex flex-row justify-center md:text-3xl">
				<span>{$c.hp.current()}</span>
				{#if $c.hp.temp !== 0}
					<span class="text-blue-500">({withSign($c.hp.temp)})</span>
				{/if}
				/
				<span>{$c.hp.max()}</span>
			</div>
		</div>

		{#if $c.hp.non_lethal !== 0}
			<div class="flex flex-col py-1 pl-2 md:flex-row md:pl-0">
				<span class="text-xs">Non Lethal:</span>
				<span class="text-md">{$c.hp.non_lethal}</span>
			</div>
		{/if}
	</div>
</button>
