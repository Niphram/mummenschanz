<script lang="ts">
	import { fade } from 'svelte/transition';

	export let delay = 100;
</script>

<div in:fade|global={{ delay }} class="loading loading-dots loading-lg justify-center" />
