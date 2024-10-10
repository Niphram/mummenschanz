<script lang="ts">
	import Collapse from '$lib/atoms/collapse.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import TextArea from '$lib/atoms/text-area.svelte';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import { t } from '$lib/i18n';
	import { parseTextWithMacros } from '$lib/macro/text';

	import { char } from '../context';
	import { FACET_KEYS } from '../data/persona';
	import PersonaFacetDialog from '../dialogs/persona-facet-dialog.svelte';

	const { openDialog } = dialogContext();

	const c = char();
</script>

<div class="flex flex-col gap-4 md:gap-2">
	<Divider>Facets</Divider>

	<div class="flex w-full flex-col gap-2">
		{#each FACET_KEYS as facet}
			{#if $c.persona[facet].notes}
				<Collapse
					icon="arrow"
					open={true}
					on:contextmenu={() => openDialog(PersonaFacetDialog, { c, facet })}
				>
					<div
						slot="title"
						class="flex h-8 flex-row items-center justify-start gap-4 text-xl font-semibold md:h-4 md:text-base"
					>
						<span>{$c.persona[facet].rank}</span>
						<span>{$t(`pathfinder_wip.persona.${facet}`)}</span>
					</div>

					{#each parseTextWithMacros($c.persona[facet].notes, $c).split('\n') as line}
						<p>{line}</p>
					{/each}
				</Collapse>
			{:else}
				<button
					class="btn justify-start md:btn-sm md:px-4"
					on:contextmenu|preventDefault={() => openDialog(PersonaFacetDialog, { c, facet })}
				>
					<div class="flex flex-row justify-start gap-4 text-xl font-semibold md:text-base">
						<span>{$c.persona[facet].rank}</span>
						<span>{$t(`pathfinder_wip.persona.${facet}`)}</span>
					</div>
				</button>
			{/if}
		{/each}
	</div>

	<Divider>Notes</Divider>

	<TextArea name="notes" bind:value={$c.persona.notes} rows={10} placeholder="Notes" />
</div>
