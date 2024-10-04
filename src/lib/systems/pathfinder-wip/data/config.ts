import { autoserialize } from 'cerialize';

export class Config {
	@autoserialize
	use_average_hp = false;
}
