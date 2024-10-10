<script lang="ts">
	import Divider from '$lib/atoms/divider.svelte';
	import AbilityButtons from '../components/ability-buttons.svelte';
	import NameButton from '../components/name-button.svelte';

	import { char } from '../context';
	import { Item } from '../data/item';
	import Hp from '../sections/hp.svelte';
	import Inventory from '../sections/inventory.svelte';
	import Persona from '../sections/persona.svelte';
	import Skills from '../sections/skills.svelte';
	import Valuables from '../sections/valuables.svelte';

	const c = char();
</script>

<div class="flex h-screen flex-col">
	<div class="sticky top-0 z-40 w-full bg-base-200 drop-shadow-xl">
		<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
			<NameButton />
			<Hp />
		</div>
	</div>

	<div class="flex grow snap-x snap-mandatory flex-row flex-nowrap overflow-x-scroll scroll-smooth">
		<!--Abilities-->
		<div
			id="abilities"
			class="flex w-full flex-none snap-center snap-always flex-col items-stretch gap-2 overflow-y-scroll border p-4"
		>
			<Divider>Abilities</Divider>
			<div class="grid grid-flow-row grid-cols-3 gap-2">
				<AbilityButtons />
			</div>
		</div>

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

			<Divider>
				Inventory
				<button on:click={() => ($c.items.push(new Item()), ($c = $c))}>ADD</button>
			</Divider>
			<Inventory />
		</div>

		<!--Persona-->
		<div
			id="persona"
			class="flex w-full flex-none snap-center snap-always flex-col items-stretch gap-4 overflow-y-scroll border p-4 md:gap-4"
		>
			<Persona />
		</div>
	</div>
</div>
