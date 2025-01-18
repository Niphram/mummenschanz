import { DESERIALIZE, SERIALIZE, Serializable } from './serializable';

export type TextOptions = {
	minLength: number;
	maxLength: number;
};

const DEFAULT_OPTIONS: TextOptions = {
	minLength: 0,
	maxLength: Infinity,
};

export class Text extends Serializable {
	public value = $state('');

	public readonly _config = Object.assign({}, DEFAULT_OPTIONS);
	public get config(): Readonly<TextOptions> {
		return this._config;
	}

	constructor(value = '') {
		super();

		this.value = $state(value);
	}

	min(min: number) {
		this._config.minLength = min;
		return this;
	}

	max(max: number) {
		this._config.maxLength = max;
		return this;
	}

	[SERIALIZE]() {
		this.validate(this.value);

		return this.value;
	}

	[DESERIALIZE](data: unknown) {
		if (data === undefined || data === null) return;

		this.validate(data);

		this.value = data;
	}

	private validate(data: unknown): asserts data is string {
		if (typeof data !== 'string') throw new Error('value is not of type string');

		if (data.length < this._config.minLength) throw new Error('length of value is too low');

		if (data.length > this._config.maxLength) throw new Error('length of value is too long');
	}
}
