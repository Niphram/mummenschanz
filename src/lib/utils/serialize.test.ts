import { autoserialize, GenericDeserialize, GenericDeserializeInto, Serialize } from 'cerialize';
import { describe, expect, it } from 'vitest';

import { mapSum } from './array';
import { autoserializeArrayAs } from './serialize';

class Item {
	@autoserialize
	prop;

	constructor(prop: number) {
		this.prop = prop;
	}
}

class Container extends Array<Item> {
	get sum() {
		return mapSum(this, (i) => i.prop);
	}
}

class Test {
	@autoserializeArrayAs(Container, Item)
	array = new Container();

	prop?: number;
}

describe('autoserializeArrayAs', () => {
	describe('Serialize', () => {
		it('should serialize array', () => {
			const test = new Test();
			test.array.push(new Item(1), new Item(2));

			const object = Serialize(test);

			expect(object).toStrictEqual({
				array: [{ prop: 1 }, { prop: 2 }],
			});
		});

		it('should serialize empty array', () => {
			const test = new Test();

			const object = Serialize(test);

			expect(object).toStrictEqual({
				array: [],
			});
		});
	});

	describe('Deserialize', () => {
		it('should deserialize array with elements', () => {
			const test = GenericDeserialize({ array: [{ prop: 1 }, { prop: 2 }] }, Test);

			expect(test).toBeInstanceOf(Test);
			expect(test.array).toBeInstanceOf(Container);
			expect(test.array[0]).toBeInstanceOf(Item);
			expect(test.array[1]).toBeInstanceOf(Item);
			expect(test).toEqual({
				array: [{ prop: 1 }, { prop: 2 }],
			});
			expect(test.array.sum).toBe(3);
		});

		it('should deserialize empty array', () => {
			const test = GenericDeserialize({ array: [] }, Test);

			expect(test).toBeInstanceOf(Test);
			expect(test.array).toBeInstanceOf(Container);
			expect(test).toEqual({
				array: [],
			});
			expect(test.array.sum).toBe(0);
		});
	});

	describe('DeserializeInto', () => {
		it('should deserialize array with elements', () => {
			const test = new Test();
			test.prop = 10;
			test.array.push(new Item(5)); // Should get overridden

			GenericDeserializeInto({ array: [{ prop: 1 }, { prop: 2 }] }, Test, test);

			expect(test).toBeInstanceOf(Test);
			expect(test.array).toBeInstanceOf(Container);
			expect(test.array[0]).toBeInstanceOf(Item);
			expect(test.array[1]).toBeInstanceOf(Item);
			expect(test).toEqual({
				prop: 10,
				array: [{ prop: 1 }, { prop: 2 }],
			});
			expect(test.array.sum).toBe(3);
		});

		it('should deserialize empty array', () => {
			const test = new Test();
			test.prop = 10;
			test.array.push(new Item(5)); // Should get overridden

			GenericDeserializeInto({ array: [] }, Test, test);

			expect(test).toBeInstanceOf(Test);
			expect(test.array).toBeInstanceOf(Container);
			expect(test).toEqual({
				prop: 10,
				array: [],
			});
			expect(test.array.sum).toBe(0);
		});
	});
});
