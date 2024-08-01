<script lang="ts">
	import type { Writable } from 'svelte/store';

	import DialogBase from '$lib/components/dialog-base.svelte';
	import { t } from '$lib/i18n';
	import type { Proxied } from '$lib/systems';

	import type { FateCondensedCharacter } from '../character';

	export let c: Writable<Proxied<FateCondensedCharacter>>;
</script>

<DialogBase title={$t('general.character.name')}>
	<div class="form-control w-full">
		<label for="name" class="label pb-0">
			<span class="label-text">{$t('general.character.name')}</span>
		</label>
		<input name="name" class="input input-bordered w-full" bind:value={$c.name} />
	</div>

	<div class="form-control w-full">
		<label for="pronouns" class="label pb-0">
			<span class="label-text">{$t('general.character.pronouns')}</span>
		</label>
		<input name="pronouns" class="input input-bordered w-full" bind:value={$c.pronouns} />
	</div>
</DialogBase>
