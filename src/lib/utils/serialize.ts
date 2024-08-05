import { autoserializeAs, GenericDeserializeInto } from 'cerialize';

import type { Constructor } from './utilTypes';

/**
 * Used to serialize/deserialize array-wrappers (classes extending 'Array').
 * The container class must not have properties that are serialized/deserialized.
 * Primarily use this, if you create a wrapper class that has utility-functions.
 */
export function autoserializeArrayAs<I, C extends Constructor<I[]>>(
	ContainerType: C,
	ItemType: Constructor<I>,
	keyName?: string,
) {
	return autoserializeAs(
		{
			Deserialize(json, instance) {
				return GenericDeserializeInto(json, ItemType, instance ?? new ContainerType());
			},
		},
		keyName,
	);
}
