<script lang="ts">
	import type { Writable } from 'svelte/store';

	import Divider from '$lib/atoms/divider.svelte';
	import IntegerInput from '$lib/atoms/integer-input.svelte';
	import Select from '$lib/atoms/select.svelte';
	import DialogBase from '$lib/components/dialog-base.svelte';
	import { t } from '$lib/i18n';

	import { SHOW_OPTIONS, type FateCondensedCharacter } from '../character';

	export let c: Writable<FateCondensedCharacter>;

	$: skills = $c.skills.filter((s) => s.name);

	$: physical_error =
		!!$c.physical_stress_skill && !$c.skills.find((s) => s.name === $c.physical_stress_skill);

	$: mental_error =
		!!$c.mental_stress_skill && !$c.skills.find((s) => s.name === $c.mental_stress_skill);
</script>

<DialogBase title={$t('fate_condensed.vitals')}>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col">
			<Divider>{$t('fate_condensed.physical_stress')}</Divider>

			<div class="flex flex-row gap-2">
				<div class="w-32">
					<IntegerInput
						name="physical_stress_base"
						label={$t('fate_condensed.base')}
						min={1}
						max={10}
						bind:value={$c.physical_stress_base}
					/>
				</div>

				<Select
					name="physical_skill"
					options={skills}
					label={$t('fate_condensed.skill')}
					bind:value={$c.physical_stress_skill}
					error={physical_error}
					let:option
				>
					<option slot="once" value="">---</option>

					<option value={option.name}>{option.name}</option>
				</Select>
			</div>
		</div>

		<div class="flex flex-col">
			<Divider>{$t('fate_condensed.mental_stress')}</Divider>

			<div class="flex flex-row gap-2">
				<div class="w-32">
					<IntegerInput
						name="physical_stress_base"
						label={$t('fate_condensed.base')}
						min={1}
						max={10}
						bind:value={$c.physical_stress_base}
					/>
				</div>
				<Select
					name="mental_skill"
					options={skills}
					label={$t('fate_condensed.skill')}
					bind:value={$c.mental_stress_skill}
					error={mental_error}
					let:option
				>
					<option slot="once" value="">---</option>

					<option value={option.name}>{option.name}</option>
				</Select>
			</div>
		</div>

		<div class="flex flex-col">
			<Divider>{$t('fate_condensed.consequences')}</Divider>

			<Select
				name="mental_skill"
				options={SHOW_OPTIONS}
				label={$t('fate_condensed.show_additional_mild_consequence')}
				bind:value={$c.show_additional_consequence}
				let:option
			>
				<option value={option}>{$t(`general.ui.${option}`)}</option>
			</Select>
		</div>
	</div>
</DialogBase>
