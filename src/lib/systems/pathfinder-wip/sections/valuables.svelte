<script>
	import IntegerInput from '$lib/atoms/integer-input.svelte';
	import TextArea from '$lib/atoms/text-area.svelte';

	import { char } from '../context';

	const c = char();
</script>

<div class="flex flex-col gap-2">
	<div class="flex flex-row gap-2">
		<IntegerInput label="CP" name="cp" bind:value={$c.money.cp} />
		<IntegerInput label="SP" name="sp" bind:value={$c.money.sp} />
		<IntegerInput label="GP" name="gp" bind:value={$c.money.gp} />
		<IntegerInput label="PP" name="pp" bind:value={$c.money.pp} />
	</div>

	<TextArea
		name="money_notes"
		placeholder="Other valuables"
		rows={2}
		resize="vertical"
		bind:value={$c.money.notes}
	/>
</div>
