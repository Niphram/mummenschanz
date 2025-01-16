import { createToken, EmbeddedActionsParser, Lexer, tokenMatcher } from 'chevrotain';

const AdditionOperator = createToken({
	name: 'AdditionOperator',
	pattern: Lexer.NA,
});

const Plus = createToken({
	name: 'Plus',
	pattern: /\+/,
	categories: AdditionOperator,
});

const Minus = createToken({
	name: 'Minus',
	pattern: /-/,
	categories: AdditionOperator,
});

const MultiplicationOperator = createToken({
	name: 'MultiplicationOperator',
	pattern: Lexer.NA,
});

const Multi = createToken({
	name: 'Multi',
	pattern: /\*/,
	categories: MultiplicationOperator,
});

const Div = createToken({
	name: 'Div',
	pattern: /\//,
	categories: MultiplicationOperator,
});

const AtSign = createToken({
	name: 'AtSign',
	pattern: /@/,
});

const Period = createToken({
	name: 'Period',
	pattern: /\./,
});

const LiteralString = createToken({
	name: 'LiteralString',
	pattern: /[a-z]+/,
});

const LParen = createToken({ name: 'LParen', pattern: /\(/ });
const RParen = createToken({ name: 'RParen', pattern: /\)/ });

const NumberLiteral = createToken({
	name: 'NumberLiteral',
	pattern: /[1-9]\d*/,
});

// marking WhiteSpace as 'SKIPPED' makes the lexer skip it.
const WhiteSpace = createToken({
	name: 'WhiteSpace',
	pattern: /\s+/,
	group: Lexer.SKIPPED,
});

const allTokens = [
	// whitespace is normally very common so it should be placed first to speed up the lexer's performance
	WhiteSpace,
	Plus,
	Minus,
	Multi,
	Div,
	LParen,
	RParen,
	NumberLiteral,
	AtSign,
	LiteralString,
	Period,
	AdditionOperator,
	MultiplicationOperator,
];

export const lexer = new Lexer(allTokens);

export class Parser extends EmbeddedActionsParser {
	constructor() {
		super(allTokens);

		this.performSelfAnalysis();
	}

	expression = this.RULE('expression', (char: object) => {
		return this.SUBRULE(this.additionExpression, { ARGS: [char] });
	});

	//  lowest precedence thus it is first in the rule chain
	// The precedence of binary expressions is determined by how far down the Parse Tree
	// The binary expression appears.
	private additionExpression = this.RULE('additionExpression', (char: object) => {
		// parsing part
		let value = this.SUBRULE(this.multiplicationExpression, { ARGS: [char] });
		this.MANY(() => {
			// consuming 'AdditionOperator' will consume either Plus or Minus as they are subclasses of AdditionOperator
			const op = this.CONSUME(AdditionOperator);
			//  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
			const rhsVal = this.SUBRULE2(this.multiplicationExpression, { ARGS: [char] });

			// interpreter part
			if (tokenMatcher(op, Plus)) {
				value += rhsVal;
			} else {
				// op instanceof Minus
				value -= rhsVal;
			}
		});

		return value;
	});

	private multiplicationExpression = this.RULE('multiplicationExpression', (char: object) => {
		// parsing part
		let value = this.SUBRULE(this.atomicExpression, { ARGS: [char] });
		this.MANY(() => {
			const op = this.CONSUME(MultiplicationOperator);
			//  the index "2" in SUBRULE2 is needed to identify the unique position in the grammar during runtime
			const rhsVal = this.SUBRULE2(this.atomicExpression, { ARGS: [char] });

			// interpreter part
			if (tokenMatcher(op, Multi)) {
				value *= rhsVal;
			} else {
				value /= rhsVal;
			}
		});

		return value;
	});

	private atomicExpression = this.RULE('atomicExpression', (char: object): number => {
		return this.OR([
			{ ALT: () => this.SUBRULE(this.parenthesisExpression, { ARGS: [char] }) },
			{ ALT: () => parseInt(this.CONSUME(NumberLiteral).image, 10) },
			{ ALT: () => this.SUBRULE(this.attributeExpression, { ARGS: [char] }) },
		]);
	});

	private attributeExpression = this.RULE('attributeExpression', (char: object) => {
		this.CONSUME(AtSign);

		const path: string[] = [];

		this.MANY_SEP({
			SEP: Period,
			DEF: () => {
				path.push(this.CONSUME(LiteralString).image);
			},
		});

		console.log(char, path);

		return this.ACTION(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const res = path.reduce((c, p) => c[p], char as Record<string, any>);

			console.log(res);

			return res;
		});
	});

	private parenthesisExpression = this.RULE('parenthesisExpression', (char: object) => {
		this.CONSUME(LParen);
		const expValue = this.SUBRULE(this.expression, { ARGS: [char] });
		this.CONSUME(RParen);

		return expValue;
	});
}
