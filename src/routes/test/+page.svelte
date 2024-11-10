<!-- TODO: Implement this as a component -->

<h1>CSS-only shadow-scrolling effect</h1>
<h2>Scroll down on the right-most list!</h2>

<div class="h-96 w-96 overflow-y-auto border border-solid border-black bg-base-300">
	<div>
		<p class="sticky top-0 -scale-y-150 transform-gpu">Test</p>
		{#each { length: 20 } as _}
			<p>Content</p>
		{/each}
	</div>
</div>
