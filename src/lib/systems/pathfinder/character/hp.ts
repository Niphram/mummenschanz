export class HP {
	rolled = 0;

	temp = 0;

	damage_taken = 0;

	non_lethal = 0;

	heal(value: number) {
		this.damage_taken = Math.max(0, this.damage_taken - value);
		this.non_lethal = Math.max(0, this.non_lethal - value);
	}

	damage(value: number, nonLethal = false) {
		if (nonLethal) {
			this.non_lethal += value;
		} else {
			this.damage_taken += value;
		}
	}
}
