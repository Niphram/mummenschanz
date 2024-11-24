<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { MouseEventHandler } from 'svelte/elements';

	const SIZE_MAP = {
		lg: 'btn-lg',
		md: 'btn-md',
		sm: 'btn-sm',
		xs: 'btn-xs',
	};

	const COLOR_MAP = {
		neutral: 'btn-neutral',
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		info: 'btn-info',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error',
	};

	interface Props {
		class?: string;
		size?: keyof typeof SIZE_MAP;
		color?: keyof typeof COLOR_MAP;
		onclick?: MouseEventHandler<HTMLButtonElement>;
		children?: Snippet;
	}

	let {
		class: className = '',
		size = 'md',
		color = 'neutral',
		onclick,
		children: children_render,
	}: Props = $props();
</script>

<button class="btn {SIZE_MAP[size]} {COLOR_MAP[color]} {className}" {onclick}>
	{@render children_render?.()}
</button>
