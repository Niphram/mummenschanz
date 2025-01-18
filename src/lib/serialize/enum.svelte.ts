import { DESERIALIZE, Serializable, SERIALIZE } from './serializable';

export class Enum<V extends string> extends Serializable {
	public value = $state() as V;

	public readonly options: V[];

	constructor(options: V[], value: V) {
		super();
		this.options = options;
		this.value = value;
	}

	[SERIALIZE]() {
		this.validate(this.value);

		return this.value;
	}

	[DESERIALIZE](data: unknown) {
		// When the data is undefined or null, don't do anything
		if (data === undefined || data === null) return;

		this.validate(data);

		this.value = data;
	}

	private validate(data: unknown): asserts data is V {
		if (typeof data !== 'string') throw new Error('value is not of type string');

		if (!this.options.includes(data as V)) throw new Error('invalid enum value');
	}
}
