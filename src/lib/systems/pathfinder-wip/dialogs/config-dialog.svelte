<script lang="ts">
	import type { Proxied } from '$lib/systems/character-proxy';
	import type { Writable } from 'svelte/store';
	import type { PathfinderCharacter } from '../data/character';

	export const title = 'Character Config';

	export let c: Writable<Proxied<PathfinderCharacter>>;
</script>

<div class="flex flex-col gap-2">
	<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">Use average HP</span>
			<input type="checkbox" class="toggle" bind:checked={$c.config.use_average_hp} />
		</label>
	</div>
</div>
