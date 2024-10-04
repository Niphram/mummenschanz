import { autoserialize } from 'cerialize';

export class Money {
	@autoserialize
	cp = 0;

	@autoserialize
	sp = 0;

	@autoserialize
	gp = 0;

	@autoserialize
	pp = 0;

	@autoserialize
	notes = '';
}
