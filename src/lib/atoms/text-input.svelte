<script lang="ts">
	export let value: string;

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	export let small = false;
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
