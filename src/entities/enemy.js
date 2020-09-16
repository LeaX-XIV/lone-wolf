class Enemy {
	constructor(combat, baseResist, resist) {
		this.combat = undefined;
		this.baseResist = undefined;
		this.resist = undefined;

		this.setCombat(combat);
		this.setBaseResist(baseResist);
		this.setResist(resist);
	}

	getCombat() {
		return this.combat;
	}

	getBaseResist() {
		return this.baseResist;
	}

	getResist() {
		return this.resist;
	}

	setCombat(combat) {
		if(combat === '' || (!isNaN(Number(combat)) && combat > 0))
			this.combat = combat;
	}

	setBaseResist(baseResist) {
		if(baseResist === '' || (!isNaN(Number(baseResist)) && baseResist > 0)) {
			this.baseResist = baseResist;
			this.resist = baseResist;
		}
	}

	setResist(resist) {
		if(!isNaN(Number(resist)) && resist >= 0 && resist <= this.baseResist)
			this.resist = resist;
	}

}

export default Enemy;