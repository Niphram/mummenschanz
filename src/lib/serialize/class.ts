import { DESERIALIZE, Serializable, SERIALIZE } from './serializable';

export class SerializableClass extends Serializable {
	[SERIALIZE]() {
		const keys = Object.keys(this);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result: any = {};

		for (const key of keys) {
			if (this[key] instanceof Serializable) {
				result[key] = this[key][SERIALIZE]();
			}
		}

		return result;
	}

	[DESERIALIZE](data: unknown) {
		const keys = Object.keys(this);

		for (const key of keys) {
			if (this[key] instanceof Serializable) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				this[key][DESERIALIZE](data[key]);
			}
		}
	}
}
