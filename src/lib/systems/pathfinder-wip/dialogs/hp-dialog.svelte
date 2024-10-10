<script lang="ts">
	import ResponsiveDialogBase from '$lib/components/responsive-dialog-base.svelte';
	import type { Proxied } from '$lib/systems/character-proxy';
	import type { Writable } from 'svelte/store';
	import type { PathfinderCharacter } from '../data/character';
	import IntegerInput from '$lib/atoms/integer-input.svelte';
	import Divider from '$lib/atoms/divider.svelte';
	import MacroInput from '$lib/atoms/macro-input.svelte';

	export let c: Writable<Proxied<PathfinderCharacter>>;

	$: conHp = $c.hp.conHp();

	let modifyAmount = 1;
</script>

<ResponsiveDialogBase title="Hit Points">
	<div class="flex h-full flex-col gap-4">
		<div class="flex grow flex-col gap-4">
			<div
				class="grid grid-flow-row grid-cols-2 place-items-center content-center items-center gap-2"
			>
				<div class="flex flex-col items-center">
					<span class="uppercase">Current HP</span>
					<input
						type="number"
						class="input input-bordered w-full text-center text-2xl"
						value={$c.hp.current()}
						on:input={(e) => ($c.hp.damage_taken = $c.hp.max() - +e.currentTarget.value)}
					/>
				</div>

				<div class="flex flex-col items-center">
					<span class="uppercase">Max HP</span>
					<span class="text-4xl font-extrabold">{$c.hp.max()}</span>
				</div>
				<div class="flex flex-col items-center">
					<span class="uppercase">Temp HP</span>
					<input
						type="number"
						class="input input-bordered w-full text-center text-2xl"
						bind:value={$c.hp.temp}
					/>
				</div>
				<div class="flex flex-col items-center">
					<span class="uppercase">Non Lethal</span>
					<input
						type="number"
						class="input input-bordered w-full text-center text-2xl"
						bind:value={$c.hp.non_lethal}
					/>
				</div>
			</div>

			<Divider>Modify</Divider>

			<div class="flex h-min flex-row items-stretch gap-4">
				<div class="flex flex-1 basis-0 flex-col">
					<button
						on:click|preventDefault={() => ($c.hp.heal(modifyAmount), ($c = $c))}
						class="btn grow bg-green-500 px-2 text-lg lg:text-xl">Heal</button
					>
				</div>
				<input
					type="number"
					class="input input-bordered h-auto w-24 text-center text-6xl"
					min="0"
					bind:value={modifyAmount}
				/>
				<div class="flex flex-1 basis-0 flex-col gap-2">
					<button
						on:click|preventDefault={() => ($c.hp.dealLethal(modifyAmount), ($c = $c))}
						class="btn grow bg-red-500 px-2 text-lg lg:text-xl">Lethal</button
					>
					<button
						on:click|preventDefault={() => ($c.hp.dealNonLethal(modifyAmount), ($c = $c))}
						class="btn grow bg-orange-500 px-2 text-lg lg:text-xl">Non-Lethal</button
					>
				</div>
			</div>
		</div>

		<div class="contents">
			<Divider>Values</Divider>

			{#if conHp !== 0}
				<div class="alert">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="h-6 w-6 shrink-0 stroke-neutral"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<span>
						Constitution Mod: {Math.abs(conHp)} HP will be {conHp < 0 ? 'subtracted' : 'added'}
					</span>
				</div>
			{/if}

			<IntegerInput
				label="Rolled Hitpoints (excluding CON)"
				name="rolled_hp"
				bind:value={$c.hp.rolled}
				min={0}
			/>

			<MacroInput label="Bonus HP" bind:value={$c.hp.bonus.expr} name="bonus_hp" c={$c} />
		</div>
	</div>
</ResponsiveDialogBase>
