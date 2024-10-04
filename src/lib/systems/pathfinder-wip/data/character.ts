import { autoserializeAs, inheritSerialization } from 'cerialize';

import { VersionedCharacter } from '$lib/systems';

import { MIGRATION } from '../migration';
import { Ability } from './ability';
import { Config } from './config';
import { autoserializeArrayAs } from '$lib/utils/serialize';
import { Class, Classes } from './class';
import { HitPoints } from './hp';
import { Skills } from './skill';

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

	@autoserializeAs(Config)
	config = new Config();
}
