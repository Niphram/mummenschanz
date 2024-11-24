<script lang="ts">
	const SIZE_MAP = {
		lg: 'toggle-lg',
		md: 'toggle-md',
		sm: 'toggle-sm',
		xs: 'toggle-xs',
	};

	interface Props {
		label: string;
		checked: boolean;
		disabled: boolean;
		size: keyof typeof SIZE_MAP;
	}

	let { label, checked = $bindable(), disabled = false, size = 'md' }: Props = $props();
</script>

<div class="form-control">
	<label class="label cursor-pointer">
		<span class="label-text">{label}</span>
		<input type="checkbox" class="toggle {SIZE_MAP[size]}" bind:checked {disabled} />
	</label>
</div>
