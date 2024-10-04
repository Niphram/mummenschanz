<script lang="ts">
	import DialogBase from '$lib/components/dialog-base.svelte';
	import { t } from '$lib/i18n';

	export let title: string = '';

	export let message: string = '';

	export let onCancel: undefined | (() => void) = undefined;
	export let onConfirm: undefined | (() => void) = undefined;
</script>

<DialogBase {title}>
	<p class="py-4">{message}</p>

	<div class="modal-action">
		<button class="btn" on:click={onCancel}>{$t('general.ui.cancel')}</button>
		<button class="btn btn-primary" on:click={onConfirm}>{$t('general.ui.confirm')}</button>
	</div>
</DialogBase>
