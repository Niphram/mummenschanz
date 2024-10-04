import { autoserialize, autoserializeAs } from 'cerialize';
import { nanoid } from 'nanoid';

import { mapSum } from '$lib/utils';

export class Item {
	id = nanoid();

	@autoserialize
	name = 'Unnamed Item';

	@autoserialize
	quantity = 1;

	@autoserialize
	equipped = true;

	@autoserialize
	weight = 0;

	@autoserialize
	isContainer = false;

	@autoserializeAs(Item)
	contents: Item[] = [];

	get totalWeight(): number {
		return (
			this.quantity * this.weight +
			(this.isContainer ? mapSum(this.contents, (item) => item.totalWeight) : 0)
		);
	}
}

export class Items extends Array<Item> {
	get totalWeight() {
		return mapSum(this, (i) => (!i.isContainer || i.equipped ? i.totalWeight : 0));
	}
}
