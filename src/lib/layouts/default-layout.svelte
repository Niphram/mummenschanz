<script lang="ts">
	import { base } from '$app/paths';
</script>

<div class="flex min-h-screen flex-col items-stretch gap-4">
	<div class="flex grow flex-col gap-4">
		<!-- HEADER -->
		<div id="header" class="sticky top-0 z-40 flex w-full flex-col bg-base-200 drop-shadow-xl">
			<slot name="header">
				<div class="flex flex-row items-stretch gap-2 p-2 align-middle">
					<p class="text-lg font-bold">Mummenschanz (Work in Progress)</p>
				</div>
			</slot>
		</div>

		<!-- Content -->
		<div class="flex grow flex-col items-center px-4">
			<slot />
		</div>
	</div>

	<!-- Footer -->
	<footer class="footer items-center gap-y-4 self-end bg-neutral p-4 text-neutral-content">
		<aside class="grid-flow-col items-center">
			<p>&copy; 2024 Niphram - All right reserved</p>
		</aside>
		<nav class="grid-flow-col gap-4 md:self-center md:justify-self-end">
			<a href="{base}/privacy" class="link">Privacy Policy</a>
			<a href="https://github.com/Niphram/mummenschanz" class="link">Github</a>
		</nav>
	</footer>
</div>
