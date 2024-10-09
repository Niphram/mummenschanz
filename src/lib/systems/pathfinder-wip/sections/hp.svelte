<script lang="ts">
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import { withSign } from '$lib/utils';
	import { char } from '../context';
	import HpDialog from '../dialogs/hp-dialog.svelte';

	const { openDialog } = dialogContext();

	const c = char();

	$: staggered = $c.hp.non_lethal === $c.hp.current() + $c.hp.temp;
	$: unconscious = $c.hp.non_lethal > $c.hp.current() + $c.hp.temp;
</script>

<button
	class="btn h-auto max-h-none w-40 p-0"
	class:bg-orange-500={staggered}
	class:bg-red-500={unconscious}
	on:click={() => openDialog(HpDialog, { c })}
>
	<div class="flex w-full flex-col divide-y-2 divide-base-100 text-center">
		<div class="contents">
			<span>Hit Points</span>
			<div class="flex flex-row justify-center py-1 text-3xl">
				<span>{$c.hp.current()}</span>
				{#if $c.hp.temp !== 0}
					<span class="text-blue-500">({withSign($c.hp.temp)})</span>
				{/if}
				/
				<span>{$c.hp.max()}</span>
			</div>
		</div>

		{#if $c.hp.non_lethal !== 0}
			<div class="py-1">
				<span>Non Lethal: {$c.hp.non_lethal}</span>
			</div>
		{/if}
	</div>
</button>
