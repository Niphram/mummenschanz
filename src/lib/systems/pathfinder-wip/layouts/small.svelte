<script lang="ts">
	import Divider from '$lib/atoms/divider.svelte';
	import Header from '$lib/atoms/header.svelte';
	import NameButton from '../components/name-button.svelte';

	import { char } from '../context';
	import Skills from '../sections/skills.svelte';
	import Valuables from '../sections/valuables.svelte';
	import SkillsPage from './small-pages/skills-page.svelte';

	const c = char();

	const PAGES = [{ page: SkillsPage }] as const;
</script>

<div class="flex h-screen flex-col">
	<div class="sticky top-0 z-40 w-full bg-base-200 drop-shadow-xl">
		<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
			<NameButton />
			<button class="btn"> HP </button>
		</div>
	</div>

	<div class="flex grow snap-x snap-mandatory flex-row flex-nowrap overflow-x-scroll scroll-smooth">
		<!--Skills-->
		<div
			id="skills"
			class="flex w-full flex-none snap-center snap-always flex-col items-stretch gap-2 overflow-y-scroll border p-4"
		>
			<Divider>Skills</Divider>
			<div class="flex flex-col gap-2">
				<Skills />
			</div>
		</div>

		<!--Inventory-->
		<div
			id="inventory"
			class="flex w-full flex-none snap-center snap-always flex-col items-stretch gap-2 overflow-y-scroll border p-4"
		>
			<Divider>Valuables</Divider>
			<Valuables />
		</div>
	</div>
</div>
