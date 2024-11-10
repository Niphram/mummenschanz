<script lang="ts">
	interface Props {
		value: string;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		small?: boolean;
	}

	let {
		value = $bindable(),
		name,
		label = undefined,
		placeholder = undefined,
		small = false,
	}: Props = $props();
</script>

<div class="form-control w-full">
	{#if label}
		<label for={name} class="label py-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<input
		{name}
		{placeholder}
		class="input input-bordered w-full"
		bind:value
		class:input-sm={small}
	/>
</div>
