import { describe, expect, it } from 'vitest';
import { Integer } from './integer.svelte';
import { DESERIALIZE, SERIALIZE } from './serializable';
import { faker } from '@faker-js/faker';

describe('integer', () => {
	it('should serialize number', () => {
		const number = faker.number.int();
		const sut = new Integer(number);

		expect(sut[SERIALIZE]()).toBe(number);
	});

	it('should deserialize number', () => {
		const number = faker.number.int();
		const sut = new Integer();

		sut[DESERIALIZE](number);

		expect(sut.value).toBe(number);
	});

	describe('when value is not a number', () => {
		it('should throw error when serializing', () => {
			const sut = new Integer('invalid' as unknown as number);

			expect(() => sut[SERIALIZE]()).toThrow('value is not of type number');
		});

		it('should throw error when deserializing', () => {
			const sut = new Integer();

			expect(() => sut[DESERIALIZE]('invalid')).toThrow('value is not of type number');
		});
	});

	describe('when minimum is set', () => {
		it('should throw error when serializing invalid value', () => {
			const sut = new Integer(0).min(10);

			expect(() => sut[SERIALIZE]()).toThrow('value is too low');
		});

		it('should throw error when deserializing invalid value', () => {
			const sut = new Integer().min(10);

			expect(() => sut[DESERIALIZE](0)).toThrow('value is too low');
		});
	});

	describe('when maximum is set', () => {
		it('should throw error when serializing invalid value', () => {
			const sut = new Integer(10).max(0);

			expect(() => sut[SERIALIZE]()).toThrow('value is too high');
		});

		it('should throw error when deserializing invalid value', () => {
			const sut = new Integer().max(0);

			expect(() => sut[DESERIALIZE](10)).toThrow('value is too high');
		});
	});
});
