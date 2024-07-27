import type { VersionedCharacter } from '$lib/systems/versioned-character';

import { calculateNode } from './evaluate';
import { parse } from './parser';

const MACRO = /{{(.*?)}}/g;

export function parseTextWithMacros<C extends VersionedCharacter>(input: string, char: C): string {
	const parsed = input.replaceAll(MACRO, (match) => {
		const macro = match.substring(2, match.length - 2);

		// Macro has formatting options
		if (macro.startsWith(':')) {
			const split = macro.indexOf(' ');
			const format = macro.substring(1, split);
			const result = calculateNode(parse(macro.substring(split)), char);

			const signed = format.includes('+');
			const hideZero = format.includes('z');

			if (hideZero && result === 0) {
				return '';
			}

			if (signed) {
				return result >= 0 ? `+${result}` : `${result}`;
			}

			return `${result}`;
		} else {
			return `[${calculateNode(parse(macro), char).toString()}]`;
		}
	});

	return parsed;
}
