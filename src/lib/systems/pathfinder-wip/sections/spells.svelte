<script lang="ts">
	import Button from '$lib/atoms/button.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import { dialogContext } from '$lib/components/dialog-provider.svelte';
	import { char } from '../context';
	import { Spell, SPELL_LEVELS, type SpellLevel } from '../data/spell';
	import MagicDialog from '../dialogs/magic-dialog.svelte';
	import SpellDialog from '../dialogs/spell-dialog.svelte';

	const c = char();

	const { openDialog } = dialogContext();

	function addSpell(level: SpellLevel) {
		$c.spells[level].push(new Spell());

		$c = $c;
	}
</script>

<Divider>
	Spells
	<Button size="sm" color="secondary" onclick={() => openDialog(MagicDialog, { c })}>Config</Button>
</Divider>

<div class="flex flex-col">
	{#each SPELL_LEVELS as level (level)}
		<div class="flex flex-col">
			<h1>{level}</h1>
			<button class="btn btn-primary btn-sm" onclick={() => addSpell(level)}>Add</button>

			{#each $c.spells[level] as spell, idx (spell.id)}
				<button
					class="btn btn-secondary"
					onclick={() =>
						openDialog(SpellDialog, {
							c,
							level,
							idx,
						})}>{spell.name}</button
				>
			{/each}
		</div>
	{/each}
</div>
