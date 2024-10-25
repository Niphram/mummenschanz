<script lang="ts">
	export let open = false;

	export let icon: 'arrow' | 'plus' | undefined = undefined;

	let className: string = '';
	export { className as class };

	export let titleClass: string = '';
	export let contentClass: string = '';

	function toggleOpen() {
		open = !open;
	}

	function keydownHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
		} else if (event.code === 'Enter') {
			event.preventDefault();
			toggleOpen();
		}
	}

	function keyupHandler(event: KeyboardEvent) {
		if (event.code === 'Space') {
			event.preventDefault();
			toggleOpen();
		}
	}

	$: console.log(open);
</script>

<div
	class="collapse bg-base-200 text-left {className}"
	class:collapse-arrow={icon === 'arrow'}
	class:collapse-plus={icon === 'plus'}
	class:collapse-open={open}
	class:collapse-close={!open}
	on:click={toggleOpen}
	on:contextmenu|preventDefault
	on:keydown={keydownHandler}
	on:keyup={keyupHandler}
	role="button"
	tabindex="0"
>
	{#if $$slots.title}
		<div class="collapse-title h-min min-h-0 py-2 {titleClass}" class:pe-4={!icon}>
			<slot name="title" {open} />
		</div>
	{/if}

	<div class="collapse-content min-w-0 {contentClass}">
		<slot {open} />
	</div>
</div>

<style>
	.collapse-arrow > .collapse-title::after {
		top: 50%;
	}
</style>
