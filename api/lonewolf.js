class Lonewolf {
	constructor(_id, baseCombat, baseResist) {
		this._id = _id;
		this.disciplines = [];
		this.armaments = [];
		this.hasBag = true;
		this.bag = [];
		this.goldCrowns = 0;
		this.baseCombat = baseCombat;
		this.combat = this.baseCombat;
		this.baseResist = baseResist;
		this.resist = this.baseResist;
	}
}

module.exports = Lonewolf;