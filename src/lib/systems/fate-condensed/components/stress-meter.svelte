<script lang="ts">
	import { nanoid } from 'nanoid';

	interface Props {
		value: number;
		max: number;
	}

	let { value = $bindable(), max }: Props = $props();

	const name = nanoid();

	function onClick(idx: number) {
		if (idx === value) {
			value--;
		} else {
			value = idx;
		}
	}
</script>

<div class="rating rating-lg w-min gap-1">
	{#each { length: max + 1 } as _, idx (idx)}
		<input
			{name}
			type="radio"
			class="mask mask-parallelogram bg-accent"
			class:hidden={idx === 0}
			checked={idx === value}
			onclick={() => onClick(idx)}
		/>
	{/each}
</div>
