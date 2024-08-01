import { describe, expect, it, vi } from 'vitest';

import { derive, isDerive } from './derive';

describe('derive', () => {
	it('should return tagged version of the function', () => {
		const testFn = vi.fn();

		const deriveTest = derive(testFn);

		expect(isDerive(deriveTest)).toBe(true);
	});
});
