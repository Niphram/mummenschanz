<script lang="ts" module>
	import { getContext, setContext, type Component, type Snippet } from 'svelte';

	const CONTEXT_SYMBOL = Symbol('Dialog Context');

	type DialogContext = {
		openDialog: <Props extends Record<string, unknown>>(
			component: Component<Props>,
			props: Props,
		) => void;

		closeDialog: () => void;
	};

	export function dialogContext() {
		return getContext<DialogContext>(CONTEXT_SYMBOL);
	}
</script>

<script lang="ts">
	let dialog: HTMLDialogElement;

	let dialogContent = $state.raw<{
		component?: Component<Record<string, unknown>>;
		props: Record<string, unknown>;
	}>({
		component: undefined,
		props: {},
	});

	function openDialog<Props extends Record<string, unknown>>(
		component: Component<Props>,
		props: Props,
	) {
		dialogContent = {
			component,
			props,
		} as typeof dialogContent;

		dialog.showModal();
	}

	function closeDialog() {
		dialog.close();
	}

	const context = {
		openDialog,
		closeDialog,
	} satisfies DialogContext;

	function onclose() {
		dialogContent = { props: {} };
	}

	setContext(CONTEXT_SYMBOL, context);

	interface Props {
		children?: Snippet;
	}

	let { children: children_render }: Props = $props();
</script>

<dialog class="modal" bind:this={dialog} {onclose}>
	{#if dialogContent.component}
		<!--Can this key be removed?-->
		{#key dialogContent}
			<dialogContent.component {...dialogContent.props} />
		{/key}
	{/if}
</dialog>

{@render children_render?.()}
