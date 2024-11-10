<script lang="ts">
	import DialogBase from '$lib/components/dialog-base.svelte';
	import { t } from '$lib/i18n';

	interface Props {
		title?: string;
		message?: string;
		onCancel?: () => void;
		onConfirm?: () => void;
	}

	let { title = '', message = '', onCancel, onConfirm }: Props = $props();
</script>

<DialogBase {title}>
	<p class="py-4">{message}</p>

	<div class="modal-action">
		<button class="btn" onclick={onCancel}>{$t('general.ui.cancel')}</button>
		<button class="btn btn-primary" onclick={onConfirm}>{$t('general.ui.confirm')}</button>
	</div>
</DialogBase>
