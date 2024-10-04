<script lang="ts">
	import Header from '$lib/atoms/header.svelte';
	import NameButton from '../components/name-button.svelte';

	import { char } from '../context';
	import Skills from '../sections/skills.svelte';

	const c = char();
</script>

<div class="flex h-screen flex-col">
	<div class="sticky top-0 z-40 w-full bg-base-200 drop-shadow-xl">
		<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
			<NameButton />
			<button class="btn"> HP </button>
		</div>
	</div>

	<div
		class="flex flex-grow snap-x snap-mandatory flex-row flex-nowrap overflow-x-scroll scroll-smooth"
	>
		{#each { length: 4 } as _, i (i)}
			<div
				class="flex w-full flex-none snap-center snap-always justify-center overflow-y-scroll border border-black p-4"
			>
				<div class="w-full max-w-2xl border border-black">
					<Skills />
				</div>

				<div class="h-16" />
			</div>
		{/each}
	</div>
</div>

<Header>
	<div class="row">
		<button class="btn">Name</button>

		<button class="btn">HP</button>
	</div>
</Header>

<h1>Pathfinder WIP</h1>

<input bind:value={$c.name} />
