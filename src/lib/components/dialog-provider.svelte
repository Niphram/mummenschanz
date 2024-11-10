<script lang="ts" module>
	import {
		getContext,
		setContext,
		type Component,
		type ComponentProps,
		type Snippet,
	} from 'svelte';

	const CONTEXT_SYMBOL = Symbol('Dialog Context');

	type DialogContext = {
		openDialog: <Props extends Record<string, any>, C extends Component<Props>>(
			component: C,
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

	let dialogContent = $state.raw<{ component?: Component<any>; props: object }>({
		component: undefined,
		props: {},
	});

	function openDialog<Props extends Record<string, any>, C extends Component<Props>>(
		component: C,
		props: Props,
	) {
		dialogContent = {
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
