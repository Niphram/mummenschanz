<script lang="ts">
	import { calculateNode } from '$lib/macro/evaluate';
	import { NodeType, parse } from '$lib/macro/parser';
	import type { Proxied, VersionedCharacter } from '$lib/systems';

	export let c: Proxied<VersionedCharacter>;

	export let value: string;

	export let name: string;
	export let label: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	export let small = false;
	export let optional = false;

	let current = value;

	$: parsedNode = parse(current);
	$: evaluated = calculateNode(parsedNode, c);

	$: valid =
		parsedNode.type !== NodeType.Error || (!current && optional) || Number.isInteger(evaluated);

	$: if (valid) {
		value = current;
	}
</script>

<div class="form-control w-full">
	<label for={name} class="label pb-0">
		<span class="label-text">{label ?? ''}</span>
		<span class="label-text-alt text-opacity-50">(Macro)</span>
	</label>
	<input
		{name}
		{placeholder}
		class="input input-bordered w-full bg-base-200"
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

				Error: "<span class="font-mono text-opacity-50">{prefix || ''}</span><span
					class="font-mono font-bold text-error underline decoration-dashed">{error}</span
				><span class="font-mono text-opacity-50">{suffix || ''}</span>"
			{:else}
				Value: {evaluated}
			{/if}
		</span>
	</div>
</div>
