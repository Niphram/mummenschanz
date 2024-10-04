<script>
	import NestedItemList from '../components/nested-item-list.svelte';
	import { char } from '../context';

	const c = char();
</script>

<NestedItemList bind:items={$c.items} />
