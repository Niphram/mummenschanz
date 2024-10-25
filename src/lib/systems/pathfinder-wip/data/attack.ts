import { autoserialize } from 'cerialize';
import { nanoid } from 'nanoid';

export class Attack {
	id = nanoid();

	@autoserialize
	name = 'Unnamed Attack';

	@autoserialize
	damage = '';

	@autoserialize
	notes = '';

	@autoserialize
	show_details = false;
}
