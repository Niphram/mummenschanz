<script lang="ts">
	// TODO: Rework this component

	import type { ComponentType } from 'svelte';

	export let tabs: { label: string; component: ComponentType }[];

	let activeTab = 0;
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
		<svelte:component this={tabs[activeTab].component} />
	</div>
</div>
