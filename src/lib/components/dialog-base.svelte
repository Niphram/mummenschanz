<script lang="ts">
	import { dialogContext } from './dialog-provider.svelte';

	const { closeDialog } = dialogContext();

	export let title = '';
</script>

<form method="dialog" class="modal-box pt-16">
	<div class="fixed left-0 top-0 flex h-12 w-full flex-row items-center bg-base-200 px-4">
		<div class="text-xl font-bold">{title}</div>
		<button class="btn btn-circle btn-ghost btn-sm ml-auto">✕</button>
	</div>

	<slot {closeDialog} />
</form>
<form method="dialog" class="modal-backdrop">
	<button>Close</button>
</form>
