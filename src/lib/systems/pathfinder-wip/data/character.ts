import { autoserializeAs, inheritSerialization } from 'cerialize';

import { VersionedCharacter } from '$lib/systems';
import { autoserializeArrayAs } from '$lib/utils/serialize';

import { MIGRATION } from '../migration';
import { Ability } from './ability';
import { Class, Classes } from './class';
import { Config } from './config';
import { HitPoints } from './hp';
import { Item, Items } from './item';
import { Money } from './money';
import { Skills } from './skill';
import { Persona } from './persona';

@inheritSerialization(VersionedCharacter)
export class PathfinderCharacter extends VersionedCharacter {
	constructor() {
		super('pathfinder_wip', MIGRATION.length);
	}

	@autoserializeArrayAs(Classes, Class)
	classes = new Classes(new Class());

	@autoserializeAs(HitPoints)
	hp = new HitPoints();

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

	@autoserializeArrayAs(Items, Item)
	items = new Items();

	@autoserializeAs(Money)
	money = new Money();

	@autoserializeAs(Persona)
	persona = new Persona();

	@autoserializeAs(Config)
	config = new Config();
}
