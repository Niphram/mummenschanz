<script lang="ts">
	interface Props {
		value: string;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		rows?: number;
		resize?: 'none' | 'horizontal' | 'vertical' | 'both';
	}

	let {
		value = $bindable(),
		name,
		label = undefined,
		placeholder = undefined,
		rows = 10,
		resize = 'none',
	}: Props = $props();
</script>

<div class="form-control w-full">
	{#if label}
		<label for={name} class="label py-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<textarea
		{name}
		{placeholder}
		class="textarea textarea-bordered w-full"
		style:resize
		{rows}
		bind:value
	></textarea>
</div>
