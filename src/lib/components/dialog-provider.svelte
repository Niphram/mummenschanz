<script lang="ts" context="module">
	import {
		getContext,
		setContext,
		type ComponentProps,
		type ComponentType,
		type SvelteComponent,
	} from 'svelte';
	import { writable } from 'svelte/store';

	const CONTEXT_SYMBOL = Symbol('Dialog Context');

	type DialogContext = {
		openDialog: <T extends SvelteComponent>(
			component: ComponentType<T>,
			props: ComponentProps<T>,
		) => void;

		closeDialog: () => void;
	};

	export function dialogContext() {
		return getContext<DialogContext>(CONTEXT_SYMBOL);
	}
</script>

<script lang="ts">
	let dialog: HTMLDialogElement;

	const dialogContent = writable<{ component?: ComponentType; props: object }>({
		component: undefined,
		props: {},
	});

	function openDialog<T extends SvelteComponent>(
		component: ComponentType<T>,
		props: ComponentProps<T>,
	) {
		$dialogContent = {
			component,
			props,
		};

		dialog.showModal();
	}

	function closeDialog() {
		dialog.close();
	}

	const context = {
		openDialog,
		closeDialog,
	} satisfies DialogContext;

	function onClose() {
		$dialogContent = { props: {} };
	}

	setContext(CONTEXT_SYMBOL, context);
</script>

<dialog class="modal" bind:this={dialog} on:close={onClose}>
	{#key $dialogContent}
		<svelte:component this={$dialogContent.component} {...$dialogContent.props} />
	{/key}
</dialog>

<slot />
