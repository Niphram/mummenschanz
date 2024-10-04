<script>
	import { t } from '$lib/i18n';
	import { withSign } from '$lib/utils';

	import { char } from '../context';
	import { SKILL_KEYS } from '../data/skill';

	const c = char();
</script>

{#each SKILL_KEYS as key (key)}
	{#each $c.skills[key].variants as variant}
		<button>
			<div class="btn btn-ghost join btn-sm flex flex-row gap-1 p-0">
				<div class="join-item flex items-center bg-accent">
					<span class="w-16 text-center text-accent-content">{$c.skills[key].trained}</span>
				</div>
				<div class="join-item flex flex-grow items-center bg-base-200 text-base-content">
					<span class="join-item flex-grow align-middle decoration-wavy">
						{$t(`pathfinder_wip.skills.${key}`)}
						{#if variant.name}
							({variant.name})
						{/if}
					</span>
				</div>
				<div class="join-item flex items-center bg-accent text-accent-content">
					<span class="join-item w-16 align-middle">{withSign(variant.bonus())}</span>
				</div>
			</div>
		</button>
	{/each}
{/each}
