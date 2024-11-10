<script lang="ts">
	import type { Writable } from 'svelte/store';

	import IntegerInput from '$lib/atoms/integer-input.svelte';
	import TextArea from '$lib/atoms/text-area.svelte';
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import { t } from '$lib/i18n';
	import type { Proxied } from '$lib/systems/character-proxy';

	import type { PathfinderCharacter } from '../data/character';
	import type { FacetKey } from '../data/persona';

	interface Props {
		c: Writable<Proxied<PathfinderCharacter>>;
		facet: FacetKey;
	}

	let { c, facet }: Props = $props();
</script>

<ResponsiveDialogBase title={$t(`pathfinder_wip.persona.${facet}`)}>
	<IntegerInput label="Rank" name="facet_rank" min={0} bind:value={$c.persona[facet].rank} />

	<TextArea
		label="Notes"
		name="facet_notes"
		placeholder="Notes"
		rows={10}
		bind:value={$c.persona[facet].notes}
	/>
</ResponsiveDialogBase>
