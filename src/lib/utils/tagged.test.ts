import { describe, expect, it } from 'vitest';
import { isTagged, tag } from './tagged';

describe('tag', () => {
	it('should return the instance', () => {
		const testInstance = {};

		const taggedInstance = tag('TEST', testInstance);

		expect(taggedInstance).toBe(testInstance);
		expect(isTagged(taggedInstance, 'TEST')).toBe(true);
	});
});

describe('isTagged', () => {
	it('should return true if the instance is tagged', () => {
		expect(isTagged(tag('TEST', {}), 'TEST')).toBe(true);
	});

	it('should return false if the instance is not tagged', () => {
		expect(isTagged({}, 'TEST')).toBe(false);
	});
});
