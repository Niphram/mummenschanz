import { GenericDeserialize, Serialize } from 'cerialize';
import { describe, expect, it } from 'vitest';

import { isMacro, macro, autoserializeMacro } from './macro';

describe('autoserializeMacro', () => {
	class TestClass {
		@autoserializeMacro
		test = macro('10 * 5');
	}

	describe('Serialize', () => {
		it('should return expression', () => {
			const instance = new TestClass();

			const serialized = Serialize(instance);

			expect(serialized).toEqual({ test: '10 * 5' });
		});
	});

	describe('Deserialize', () => {
		it('should return macro', () => {
			const deserialized = GenericDeserialize({ test: '100' }, TestClass);

			expect(isMacro(deserialized.test)).toBe(true);
		});
	});
});

describe('macro', () => {
	it('should return result if expression is valid', () => {
		const macroTest = macro('5 + @dex');

		expect(macroTest({ dex: 10 })).toBe(15);
	});

	it('should return NaN if expression is invalid', () => {
		const macroTest = macro('5 + @dex');

		expect(macroTest({})).toBe(NaN);
	});
});

describe('isMacro', () => {
	it('should return true if instance is macro', () => {
		expect(isMacro(macro('10'))).toBe(true);
	});

	it('should return false if instance is not macro', () => {
		expect(isMacro('anything else')).toBe(false);
	});
});
