<script lang="ts">
	import { withSign } from '$lib/utils';

	import { char } from '../context';
	import type { AbilityKey } from '../data';

	const c = char();

	export let key: AbilityKey;

	$: mod = $c[key].mod();
	$: total = $c[key].total();
	$: temp = $c[key].temp();

	$: notes = $c[key].notes;
</script>

<button class="btn h-auto p-0">
	<div class="flex w-full flex-col divide-y-2 divide-base-100 text-center">
		<div class="py-1 text-3xl font-extrabold">{withSign(mod)}</div>
		<div class="py-1 text-xs decoration-wavy" class:underline={!!notes}>
			{total}{#if temp !== 0}<span class:text-red-700={temp < 0} class:text-green-700={temp > 0}>
					{withSign(temp)}
				</span>
			{/if}
		</div>
		<div class="py-1 uppercase decoration-wavy" class:underline={!!$c[key].notes}>
			{key}
		</div>
	</div>
</button>
