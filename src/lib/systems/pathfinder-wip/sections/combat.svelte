<script lang="ts">
	import Collapse from '$lib/atoms/collapse.svelte';
	import SortableList from '$lib/components/sortable-list.svelte';
	import DragHandle from '$lib/icons/drag-handle.svelte';

	let attacks = [
		{
			name: 'Rapier',
			bonus: '+10',
			crit_range: '18-20',
			damage: '1d6+5 piercing',
		},
		{
			name: 'Rapier (Studied Combat) With a long ass name',
			bonus: '+12/+7/+2',
			crit_range: '18-20',
			damage: '1d6+5 piercing +2 (PD)',
		},
		{
			name: 'Studied Strike',
			bonus: '-',
			crit_range: '-',
			damage: '1d6 precision damage/sneak attack',
		},
	];
</script>

<div class="grid-cols-[min-content repeat(4, auto)] grid w-full grid-flow-row justify-stretch">
	<div class="col-span-5 grid grid-cols-subgrid text-center text-xs text-neutral-500">
		<div></div>
		<div>Name</div>
		<div>Atk</div>
		<div>Crit Range</div>
		<div class="pr-12">Damage</div>
	</div>

	<SortableList
		class="col-span-5 grid grid-cols-subgrid gap-y-2"
		options={{
			group: 'attacks',
			handle: '.drag-handle',
			animation: 150,
			easing: 'cubic-bezier(1, 0, 0, 1)',
			fallbackOnBody: true,
			swapThreshold: 0.65,
		}}
		keyProp="name"
		bind:items={attacks}
		let:item={attack}
	>
		<div class="col-span-5 grid grid-cols-subgrid items-center">
			<div class="drag-handle flex w-6 items-center justify-center" role="button" tabindex="0">
				<DragHandle />
			</div>

			<Collapse
				class="col-span-4 grid grid-cols-subgrid"
				titleClass="col-span-4 grid grid-cols-subgrid"
				icon="arrow"
			>
				<div slot="title" let:open class="col-span-4 grid grid-cols-subgrid items-center gap-x-2">
					<div class="text-ellipsis" class:overflow-hidden={!open} class:whitespace-nowrap={!open}>
						{attack.name}
					</div>
					<div class="text-center">{attack.bonus}</div>
					<div class="text-center">{attack.crit_range}</div>
					<div
						class="text-ellipsis text-center"
						class:overflow-hidden={!open}
						class:whitespace-nowrap={!open}
					>
						{attack.damage}
					</div>
				</div>

				<div>Content</div>
			</Collapse>
		</div>
	</SortableList>
</div>
