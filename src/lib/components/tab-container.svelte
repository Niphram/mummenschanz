<script lang="ts">
	import type { ComponentType } from 'svelte';
	import { fade } from 'svelte/transition';

	export let tabs: { label: string; component: ComponentType }[];

	let activeTab = 0;
</script>

<div role="tablist" class="tabs tabs-bordered lg:tabs-lg">
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

{#key activeTab}
	<div transition:fade class="absolute">
		<svelte:component this={tabs[activeTab].component} />
	</div>
{/key}
