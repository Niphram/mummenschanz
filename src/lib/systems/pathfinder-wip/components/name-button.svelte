<script lang="ts">
	import { char } from '../context';

	const c = char();
</script>

<button class="grow text-left">
	<div class="flex flex-col">
		<p class="text-lg font-bold">
			{$c.name} <span class="text-sm font-normal">(Lvl. 2)</span>
		</p>
		<span class="text-sm">Class 1, Class 2</span>
	</div>
</button>
