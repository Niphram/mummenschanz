import { describe, expect, it } from 'vitest';
import { lexer, Parser } from './lexer';

const parser = new Parser();

// wrapping it all together
function parseEmbedded(text: string) {
	const lexResult = lexer.tokenize(text);
	// setting a new input will RESET the parser instance's state.
	parser.input = lexResult.tokens;
	// any top level rule may be used as an entry point
	const value = parser.expression({
		test: {
			foo: {
				bar: 5,
			},
		},
	});

	return {
		value: value,
		lexResult: lexResult,
		parseErrors: parser.errors,
	};
}

describe('Chevrotain', () => {
	it('SHould', () => {
		const result = parseEmbedded('@test.foo.bar');

		expect(result.parseErrors).toEqual([]);
		expect(result.value).toEqual(3);
	});
});
