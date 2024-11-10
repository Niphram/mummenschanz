<script lang="ts">
	import { fade } from 'svelte/transition';

	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	import Loader from '$lib/atoms/loader.svelte';
	import { loadCharacter } from '$lib/character-store';
	import DefaultLayout from '$lib/layouts/default-layout.svelte';

	let id: string | null = $state(null);

	$effect.pre(() => {
		id = $page.url.searchParams.get('id');

		if (!id) {
			goto(`${base}/`);
		}
	});
</script>

{#if id}
	<div id="container">
		{#await loadCharacter(id)}
			<div in:fade>
				<DefaultLayout>
					<div class="flex grow flex-col items-center justify-center">
						<Loader />
					</div>
				</DefaultLayout>
			</div>
		{:then data}
			<div in:fade>
				<data.SheetComponent c={data.character} />
			</div>
		{:catch err}
			<div in:fade>
				<DefaultLayout>
					<div class="center flex grow flex-col justify-center gap-2">
						<div class="flex grow flex-col items-center justify-center gap-2">
							<p>The character could not be loaded!</p>

							<a class="btn" href="{base}/">Back to home</a>
						</div>

						<p>The following error might be useful for the developer:</p>

						<div
							class="max-h-32 select-text overflow-scroll rounded-box bg-neutral p-4 text-neutral-content"
						>
							<pre><code>{err.message ?? 'No error message'}</code></pre>

							{#each err.stack?.split?.('\n') ?? [] as line}
								<pre><code>{line}</code></pre>
							{/each}
						</div>
					</div>
				</DefaultLayout>
			</div>
		{/await}
	</div>
{/if}
