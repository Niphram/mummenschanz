import { autoserializeAs } from 'cerialize';

import { isTagged, tag, type Tagged } from '$lib/utils';

import { calculateNode } from './evaluate';
import { parse, type Node } from './parser';

export const MACRO_SYMBOL = Symbol('macro');

export type Macro = Tagged<
	{
		(char: NonNullable<unknown>): number;
		expr: string;
	},
	typeof MACRO_SYMBOL
>;

export const autoserializeMacro = autoserializeAs({
	Serialize(instance: Macro): string {
		return instance.expr;
	},

	Deserialize(expr: string): Macro {
		return macro(expr);
	},
});

export function macro(expr: string): Macro {
	let oldExpr: string | unknown;
	let node: Node | undefined;

	const macroEval = (char: NonNullable<unknown>) => {
		if (!node || macroEval.expr !== oldExpr) {
			node = parse(macroEval.expr);
			oldExpr = macroEval.expr;
		}

		return calculateNode(node, char);
	};

	macroEval.expr = expr;

	return tag(MACRO_SYMBOL, macroEval);
}

export function isMacro(instance: unknown): instance is Macro {
	return isTagged(instance, MACRO_SYMBOL);
}
