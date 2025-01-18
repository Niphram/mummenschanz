export const SERIALIZE = Symbol('serialize');
export const DESERIALIZE = Symbol('deserialize');

type JsonDataTypes =
	| string
	| number
	| undefined
	| {
			[property: string]: JsonDataTypes;
	  };

export abstract class Serializable {
	abstract [SERIALIZE](): JsonDataTypes;
	abstract [DESERIALIZE](data: unknown): void;
}
