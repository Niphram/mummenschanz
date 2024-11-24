<script lang="ts">
	import { calculateNode } from '$lib/macro/evaluate';
	import { NodeType, parse } from '$lib/macro/parser';
	import type { Proxied, VersionedCharacter } from '$lib/systems';

	interface Props {
		c: Proxied<VersionedCharacter>;
		value: string;
		name: string;
		label?: string | undefined;
		placeholder?: string | undefined;
		small?: boolean;
		optional?: boolean;
	}

	let {
		c,
		value = $bindable(),
		name,
		label = undefined,
		placeholder = undefined,
		small = false,
		optional = false,
	}: Props = $props();

	let current = $state(value);

	let parsedNode = $derived(parse(current));
	let evaluated = $derived(calculateNode(parsedNode, c));

	let valid = $derived(
		parsedNode.type !== NodeType.Error || (!current && optional) || Number.isInteger(evaluated),
	);

	$effect(() => {
		if (valid) {
			value = current;
		}
	});
</script>

<div class="form-control w-full">
	<label for={name} class="label py-0">
		<span class="label-text">{label ?? ''}</span>
		<span class="label-text-alt text-opacity-50">(Macro)</span>
	</label>
	<input
		{name}
		{placeholder}
		class="input input-bordered w-full"
		class:input-sm={small}
		class:input-error={!valid}
		bind:value={current}
	/>
	<div class="label">
		<span class="label-text-alt">
			{#if parsedNode.type === NodeType.Error && (current || !optional)}
				{@const prefix = parsedNode.startIdx && current.slice(0, parsedNode.startIdx)}
				{@const error = current.slice(parsedNode.startIdx, parsedNode.endIdx)}
				{@const suffix = parsedNode.endIdx && current.slice(parsedNode.endIdx)}

				{parsedNode.message}: "<span class="font-mono text-opacity-50">{prefix || ''}</span><span
					class="font-mono font-bold text-error underline decoration-dashed">{error}</span
				><span class="font-mono text-opacity-50">{suffix || ''}</span>"
			{:else}
				Value: {evaluated}
			{/if}
		</span>
	</div>
</div>
