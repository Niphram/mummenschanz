<script lang="ts">
	import { untrack } from 'svelte';

	interface Props {
		value: number;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		min?: number;
		max?: number;
		small?: boolean;
	}

	let {
		value = $bindable(),
		name,
		label = undefined,
		placeholder = undefined,
		min = -Infinity,
		max = Infinity,
		small = false,
	}: Props = $props();

	let current = $state(value);

	let valid = $derived(Number.isInteger(current) && current >= min && current <= max);

	// Update the bound value, if the input value is valid
	$effect(() => {
		if (valid) {
			const tracked = current;
			untrack(() => {
				value = tracked;
			});
		}
	});

	// Update current value, if bound value changes
	$effect(() => {
		const tracked = value;
		untrack(() => {
			current = tracked;
		});
	});
</script>

<div class="form-control w-full">
	{#if label}
		<label for={name} class="label py-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		{name}
		type="number"
		{placeholder}
		class="input input-bordered w-full"
		{min}
		{max}
		class:input-sm={small}
		class:input-error={!valid}
		bind:value={current}
	/>
</div>
