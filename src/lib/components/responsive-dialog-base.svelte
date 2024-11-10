<script lang="ts">
	import type { Snippet } from 'svelte';

	import { dialogContext } from './dialog-provider.svelte';

	const { closeDialog } = dialogContext();

	interface Props {
		title?: string;
		children?: Snippet<[closeDialog: typeof closeDialog]>;
	}

	let { title = '', children: children_render }: Props = $props();
</script>

<form
	method="dialog"
	class="modal-box h-full max-h-none w-full max-w-none rounded-none pt-16 md:h-min md:max-h-[calc(100vh-5em)] md:max-w-lg md:rounded-md"
>
	<div class="fixed left-0 top-0 flex h-12 w-full flex-row items-center bg-base-200 px-4">
		<div class="text-xl font-bold">{title}</div>
		<button class="btn btn-circle btn-ghost btn-sm ml-auto">✕</button>
	</div>

	{@render children_render?.(closeDialog)}
</form>
<form method="dialog" class="modal-backdrop">
	<button>Close</button>
</form>
