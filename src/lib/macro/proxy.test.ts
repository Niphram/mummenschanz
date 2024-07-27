import { it } from 'vitest';

import { Derive } from './derive';
import { Macro } from './macro';
import { macroProxy } from './proxy';

class Test {
	dex = 10;

	dexMacro = new Macro('@dex * 2');

	array = [
		{
			test: 10,
			dreive: new Derive((char: Test) => char.array[0].test * 4),
		},
	];

	nested = {
		val: 5,
		test: new Derive((char: Test) => char.dex * 4),
	};
}

it('Should', () => {
	const p = macroProxy(new Test());

	p.array[0].test = 1;

	console.log('ACCESS val = ' + p.nested.test);
	console.log('ACCESS macro = ' + p.dexMacro);

	p.dexMacro.expr = '@dex * 4';

	console.log(p.array[0].dreive);
	console.log(p.dexMacro.expr);
	console.log(p.dexMacro.eval());
});
