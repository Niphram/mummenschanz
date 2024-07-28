<script lang="ts">
	import { ChevronUpDown, Plus, Trash } from '@steeze-ui/heroicons';
	import { Icon } from '@steeze-ui/svelte-icon';

	const ICONS = {
		DragHandle: ChevronUpDown,
		Add: Plus,
		Remove: Trash,
	};

	export let type: keyof typeof ICONS;

	let classname: string | undefined;
	export { classname as class };
</script>

<Icon src={ICONS[type]} class={classname}></Icon>
