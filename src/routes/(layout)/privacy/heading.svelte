<script lang="ts">
	export let type: 'h1' | 'h2' | 'h3';

	export let id: string | undefined = undefined;
</script>

<svelte:element this={type} {id}>
	{#if id}
		<a aria-hidden="true" tabindex="-1" href="#{id}">
			<span
				class="relative -mt-1 mr-1 inline-block align-middle text-base font-bold opacity-20 hover:opacity-60"
			>
				#
			</span>
		</a>
	{/if}
	<slot />
</svelte:element>
