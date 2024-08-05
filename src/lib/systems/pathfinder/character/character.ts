import { VersionedCharacter, type CharacterMigrationFn } from '$lib/systems/versioned-character';
import { autoserialize, autoserializeAs, inheritSerialization } from 'cerialize';
import { Ability } from './ability';
import { Class, Classes } from './class';
import { macro } from '$lib/macro/macro';
import { Skills } from './skills';
import { autoserializeArrayAs } from '$lib/utils/serialize';

export const MIGRATIONS: CharacterMigrationFn[] = [];

@inheritSerialization(VersionedCharacter)
export class PathfinderCharacter extends VersionedCharacter {
	constructor() {
		super('pathfinder', MIGRATIONS.length);
	}

	@autoserialize
	alignment = '';

	race = ''; // custom class?

	deity = '';

	size = 'medium';

	age_category = '';
	age = 25;

	languages = '';

	senses = ''; // custom class?
	resistances = ''; // custom class?

	speed = macro(''); // custom class?
	speed_notes = '';

	@autoserializeAs(Ability)
	str = new Ability('str');
	@autoserializeAs(Ability)
	dex = new Ability('dex');
	@autoserializeAs(Ability)
	con = new Ability('con');
	@autoserializeAs(Ability)
	int = new Ability('int');
	@autoserializeAs(Ability)
	wis = new Ability('wis');
	@autoserializeAs(Ability)
	cha = new Ability('cha');

	@autoserializeAs(Skills)
	skills = new Skills();

	@autoserializeArrayAs(Classes, Class)
	classes = new Classes(new Class());
}
