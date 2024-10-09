<script lang="ts">
	export let value: number;

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	export let min = -Infinity;
	export let max = Infinity;

	export let small = false;

	let current = value;

	// Make sure to update the displayed value if the bound value changes
	$: updateCurrent(value);
	function updateCurrent(v: number) {
		current = v;
	}

	$: valid = Number.isInteger(current) && current >= min && current <= max;

	$: if (valid) {
		value = current;
	}
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
