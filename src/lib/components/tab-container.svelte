<script lang="ts">
	// TODO: Rework this component
	import type { Component } from 'svelte';

	interface Props {
		tabs: { label: string; component: Component }[];
	}

	let { tabs }: Props = $props();

	let activeTab = $state(0);

	const SvelteComponent = $derived(tabs[activeTab].component);
</script>

<div class="flex flex-col items-stretch gap-4">
	<div role="tablist" class="tabs tabs-bordered">
		{#each tabs as { label }, i (label)}
			<input
				type="radio"
				role="tab"
				class="tab"
				aria-label={label}
				value={i}
				bind:group={activeTab}
			/>
		{/each}
	</div>

	<div>
		<SvelteComponent />
	</div>
</div>
