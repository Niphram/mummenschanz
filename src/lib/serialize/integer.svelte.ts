import { DESERIALIZE, SERIALIZE, Serializable } from './serializable';

export type IntegerConfig = {
	min?: number;
	max?: number;
};

const DEFAULT_CONFIG: IntegerConfig = {};

export class Integer extends Serializable {
	public value = $state();

	private readonly _config = Object.assign({}, DEFAULT_CONFIG);
	public get config(): Readonly<IntegerConfig> {
		return this.config;
	}

	constructor(value = 0) {
		super();

		this.value = value;
	}

	min(min?: number) {
		this._config.min = min;
		return this;
	}

	max(max?: number) {
		this._config.max = max;
		return this;
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

	private validate(data: unknown): asserts data is number {
		if (typeof data !== 'number') throw new Error('value is not of type number');

		if (this._config.min !== undefined && data < this._config.min)
			throw new Error('value is too low');

		if (this._config.max !== undefined && data > this._config.max)
			throw new Error('value is too high');
	}
}
