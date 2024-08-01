import {
	alt,
	alt_sc,
	apply,
	expectEOF,
	expectSingleResult,
	kmid,
	kright,
	list,
	list_sc,
	lrec_sc,
	opt,
	rule,
	seq,
	str,
	tok,
	TokenError,
	TokenRangeError,
	type Token as ParsecToken,
	type Parser,
	type TokenPosition,
} from 'typescript-parsec';

import { tokenize, TokenKind } from './tokenizer';

type Token = ParsecToken<TokenKind>;

export enum NodeType {
	Error,
	Constant,
	Attribute,
	Unary,
	Binary,
	Func,
}

export type Node = ErrorNode | ConstantNode | AttributeNode | UnaryNode | BinaryNode | FuncNode;

type ErrorNode = {
	type: NodeType.Error;
	message: string;

	start?: TokenPosition;
	end?: TokenPosition;

	startIdx: number;
	endIdx?: number;
};

type ConstantNode = {
	type: NodeType.Constant;
	constant: number;

	start?: TokenPosition;
	end?: TokenPosition;
};

type AttributeNode = {
	type: NodeType.Attribute;
	path: string[];

	start?: TokenPosition;
	end?: TokenPosition;
};

type UnaryNode = {
	type: NodeType.Unary;
	op: '+' | '-';
	node: Node;

	start?: TokenPosition;
	end?: TokenPosition;
};

type BinaryNode = {
	type: NodeType.Binary;
	op: '+' | '-' | '*' | '/' | '%';
	left: Node;
	right: Node;

	start?: TokenPosition;
	end?: TokenPosition;
};

type FuncNode = {
	type: NodeType.Func;
	func?: 'floor' | 'round' | 'ceil' | 'min' | 'max' | 'clamp' | 'abs' | 'step';
	nodes: Node[];

	start?: TokenPosition;
	end?: TokenPosition;
};

function applyConstant(token: Token): ConstantNode {
	return {
		type: NodeType.Constant,
		constant: Number.parseInt(token.text),

		start: token.pos,
		end: token.next?.pos,
	};
}

function applyAttribute(tokens: Token[]): AttributeNode {
	return {
		type: NodeType.Attribute,
		path: tokens.map((t) => t.text),

		start: tokens[0].pos,
		end: tokens[tokens.length - 1].next?.pos,
	};
}

function applyUnary([op, node]: [Token, Node]): UnaryNode {
	switch (op.text) {
		case '+':
		case '-':
			return {
				type: NodeType.Unary,
				op: op.text,
				node,

				start: op.pos,
				end: node.end,
			};
		default:
			throw new TokenRangeError(op.pos, op.next?.pos, 'Unknown Operand');
	}
}

function applyBinary(left: Node, [token, right]: [Token, Node]): BinaryNode {
	switch (token.text) {
		case '+':
		case '-':
		case '*':
		case '/':
		case '%':
			return {
				type: NodeType.Binary,
				op: token.text,
				left,
				right,

				start: left.start,
				end: right.end,
			};
		default:
			throw new TokenRangeError(token.pos, token.next?.pos, 'Unknown Operand');
	}
}

function applyFunc([func, nodes]: [Token | undefined, Node[]]): FuncNode {
	switch (func?.text) {
		case undefined:
		case 'floor':
		case 'round':
		case 'ceil':
		case 'abs':
			if (nodes.length !== 1)
				throw new TokenRangeError(
					nodes[1].start,
					nodes[nodes.length - 1].end,
					'Expected 1 argument',
				);
			break;

		case 'min':
		case 'max':
			if (nodes.length === 0)
				throw new TokenRangeError(func?.pos, func?.next?.pos, 'Expected at least 1 argument');
			break;

		case 'clamp':
			if (nodes.length !== 3)
				throw new TokenRangeError(
					nodes[0].start,
					nodes[nodes.length - 1].end,
					'Expected 3 arguments',
				);
			break;

		case 'step':
			if (nodes.length !== 2)
				throw new TokenRangeError(
					nodes[0].start,
					nodes[nodes.length - 1].end,
					'Expected 2 arguments',
				);
			break;

		default:
			throw new TokenRangeError(func?.pos, func?.next?.pos, 'Unknown function');
	}

	return {
		type: NodeType.Func,
		func: func?.text,
		nodes,

		start: func?.pos ?? nodes[0].start,
		end: nodes[nodes.length - 1].end,
	};
}

/**
 * Parsers
 */
const TERM = rule<TokenKind, Node>();
const FACTOR = rule<TokenKind, Node>();
const EXP = rule<TokenKind, Node>();

/**
 * CONSTANT = { "0" - "9" }
 */
const constantParser = apply(tok(TokenKind.Number), applyConstant);

/**
 * ATTRIBUTE = "@" STRING [ { "." STRING } ]
 */
const attributeParser = apply(
	kright(
		tok(TokenKind.At),
		list_sc(alt_sc(tok(TokenKind.String), tok(TokenKind.Number)), tok(TokenKind.Period)),
	),
	applyAttribute,
);

/**
 * UNARY = ( "+" | "-" ) TERM
 */
const unaryParser: Parser<TokenKind, UnaryNode> = apply(
	seq(alt(str('+'), str('-')), TERM),
	applyUnary,
);

/**
 * FUNC = [ "floor" | "round" | "ceil" | "min" | "max" | "clamp" | "abs" ] "(" EXPR ["," EXPR]* ")"
 */
const funcParser = apply(
	seq(opt(tok(TokenKind.String)), kmid(str('('), list(EXP, tok(TokenKind.Comma)), str(')'))),
	applyFunc,
);

/**
 * TERM = CONSTANT | ATTRIBUTE | UNARY | FUNC
 */
TERM.setPattern(alt(constantParser, attributeParser, unaryParser, funcParser));

/**
 * FACTOR = TERM | ( FACTOR ( "*" | "/" ) TERM )
 */
FACTOR.setPattern(lrec_sc(TERM, seq(alt(str('*'), str('/')), TERM), applyBinary));

/**
 * EXP = FACTOR | ( EXP ( "+" | "-" ) FACTOR )
 */
EXP.setPattern(lrec_sc(FACTOR, seq(alt(str('+'), str('-')), FACTOR), applyBinary));

export function parse(expr: string): Node {
	try {
		return expectSingleResult(expectEOF(EXP.parse(tokenize(expr))));
	} catch (err) {
		if (isTokenRangeError(err)) {
			return {
				type: NodeType.Error,
				message: err.errorMessage,

				start: err.first,
				end: err.next,

				startIdx: err.first?.index ?? 0,
				endIdx: err.next?.index,
			};
		} else if (isTokenError(err)) {
			return {
				type: NodeType.Error,
				message: err.errorMessage,
				startIdx: err.pos?.index ?? 0,
			};
		} else {
			return {
				type: NodeType.Error,
				message: 'Unknown error',
				startIdx: 0,
			};
		}
	}
}

function isTokenError(err: unknown): err is TokenError {
	return typeof err === 'object' && err !== null && 'pos' in err;
}

function isTokenRangeError(err: unknown): err is TokenRangeError {
	return typeof err === 'object' && err !== null && ('first' in err || 'next' in err);
}
