<script lang="ts">
	import { fade } from 'svelte/transition';

	interface Props {
		delay?: number;
	}

	let { delay = 100 }: Props = $props();
</script>

<div in:fade|global={{ delay }} class="loading loading-dots loading-lg justify-center"></div>
