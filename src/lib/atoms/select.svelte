<script lang="ts" module>
	// Needed to satisfy eslint
	type V = unknown;
	type T = unknown;
</script>

<script lang="ts" generics="V, T">
	import type { Snippet } from 'svelte';

	interface Props {
		name: string;
		label?: string;
		options?: readonly T[];
		error?: boolean;
		value: V;

		children: Snippet<[option: T]>;
		once?: Snippet;
	}

	let {
		name,
		label = undefined,
		options = [],
		error = $bindable(false),
		value = $bindable(),
		children: children_render,
		once: once_render,
	}: Props = $props();
</script>

<div class="form-control w-full">
	{#if label}
		<label for={name} class="label py-0">
			<span class="label-text">{label}</span>
		</label>
	{/if}
	<select {name} class="select select-bordered w-full" class:select-error={error} bind:value>
		{@render once_render?.()}

		{#each options as option (option)}
			{@render children_render(option)}
		{/each}
	</select>
</div>
