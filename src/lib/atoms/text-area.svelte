<script lang="ts">
	interface Props {
		value: string;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		rows?: number;
		maxlength?: number;
		resize?: 'none' | 'horizontal' | 'vertical' | 'both';
	}

	let {
		value = $bindable(),
		name,
		label = undefined,
		placeholder = undefined,
		rows = 10,
		resize = 'none',
		maxlength = undefined,
	}: Props = $props();
</script>

<div class="form-control relative w-full">
	{#if label}
		<label for={name} class="label py-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<textarea
		{name}
		{placeholder}
		class="peer textarea textarea-bordered w-full"
		style:resize
		{rows}
		{maxlength}
		bind:value
	>
	</textarea>
	{#if maxlength !== undefined}
		<div
			class="label-text-alt pointer-events-none absolute bottom-2 right-2 opacity-0 transition-opacity peer-focus:opacity-100"
		>
			{value.length}/{maxlength}
		</div>
	{/if}
</div>
