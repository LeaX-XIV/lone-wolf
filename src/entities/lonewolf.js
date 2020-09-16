class Lonewolf {
	constructor(combat, maxResist, path) {
		this.combat = combat;
		this.currentCombat = this.combat;
		this.maxResist = maxResist;
		this.path = [...path];
		if(this.path.length > 0) {
			const statusDeepCopy = JSON.parse(JSON.stringify(this.path[this.path.length - 1].status));
			this.currentStatus = new LonewolfStatus(statusDeepCopy.kaiDisciplines,
				statusDeepCopy.armaments,
				statusDeepCopy.hasBag,
				statusDeepCopy.bag,
				statusDeepCopy.specialItems,
				statusDeepCopy.goldCrowns,
				statusDeepCopy.currentResist
			);
		} else {
			this.currentStatus = new LonewolfStatus([], [], true, [], [], 0, this.maxResist);
		}
	}

	static fromJSON(jsonData) {
		const lw = JSON.parse(jsonData, (k, v) => {
			return k === "status" ?
				new LonewolfStatus(v.kaiDisciplines, v.armaments, v.hasBag, v.bag, v.specialItems, v.goldCrowns, v.currentResist) :
				k === "path" ?
					v.map(c => new LonewolfChapter(c.chapter, c.status)) :
					k === "" ?
						new Lonewolf(v.combat, v.maxResist, v.path) :
						v;
		});

		if(typeof lw === "object" && lw.__proto__.constructor.name === Lonewolf.name) {
			console.log(lw);
			return lw;
		}
		else
			throw new SyntaxError("Incorrect file format.");
	}

	toJSON() {
		return {
			combat: this.combat,
			maxResist: this.maxResist,
			path: this.path
		};
	}

	getListOfChapters() {
		return this.path.map(c => c.chapter);
	}

	getStatusOfChapter(index) {
		const status = this.path[index].status;
		return new LonewolfCombatStatus(this.combat, this.maxResist, status.currentResist);
	}

	getStatus() {
		return new LonewolfCombatStatus(this.combat, this.maxResist, this.currentStatus.currentResist);
	}

	getCombatStatus() {
		return new LonewolfCombatStatus(this.currentCombat, this.maxResist, this.currentStatus.currentResist);
	}

	getKaiDisciplinesOfChapter(index) {
		const status = this.path[index].status;
		return [...status.kaiDisciplines];
	}

	getKaiDisciplines() {
		return [...this.currentStatus.kaiDisciplines];
	}

	getArmamentsOfChapter(index) {
		const status = this.path[index].status;
		return [...status.armaments];
	}

	getArmaments() {
		return [...this.currentStatus.armaments];
	}

	getBagOfChapter(index) {
		const status = this.path[index].status;
		return {
			items: [...status.bag],
			specialItems: [...status.specialItems],
			hasBag: status.hasBag,
			goldCrowns: status.goldCrowns
		};
	}

	getBag() {
		return {
			items: [...this.currentStatus.bag],
			specialItems: [...this.currentStatus.specialItems],
			hasBag: this.currentStatus.hasBag,
			goldCrowns: this.currentStatus.goldCrowns
		};
	}

	nextChapter(c) {
		this.path.push(new LonewolfChapter(c, { ...this.currentStatus }));
	}














	setCurrentCombat(newCurrentCombat) {
		if(newCurrentCombat === '' || !isNaN(newCurrentCombat))
			this.currentCombat = newCurrentCombat;
	}

	resetCurrentCombat() {
		this.setCurrentCombat(this.combat);
	}

	setCurrentResist(newResist) {
		if(newResist >= 0 && newResist <= this.maxResist)
			this.currentStatus.currentResist = newResist;
	}

	addCurrentArmament(armamentId) {
		if(this.currentStatus.armaments.length < 2)
			this.currentStatus.armaments.push(armamentId);
	}

	removeCurrentArmamentAtIndex(index) {
		this.currentStatus.armaments.splice(index, 1);
	}

	addCurrentBagItem(itemId) {
		if(this.currentStatus.bag.length < 8)
			this.currentStatus.bag.push(itemId);
	}

	removeCurrentBagItemAtIndex(index) {
		this.currentStatus.bag.splice(index, 1);
	}

	addCurrentSpecialItem(specialItemId) {
		this.currentStatus.specialItems.push(specialItemId);
	}

	removeCurrentSpecialItemsItemAtIndex(index) {
		this.currentStatus.specialItems.splice(index, 1);
	}

	setCurrentGoldCrowns(newGoldCrowns) {
		if(newGoldCrowns >= 0 && newGoldCrowns <= 50)
			this.currentStatus.goldCrowns = newGoldCrowns;
	}
}

class LonewolfChapter {
	constructor(chapter, status) {
		this.chapter = chapter;
		this.status = status;
	}
}

class LonewolfStatus {
	constructor(kaiDisciplines, armaments, hasBag, bag, specialItems, goldCrowns, currentResist) {
		this.kaiDisciplines = [...kaiDisciplines];
		this.armaments = [...armaments];
		this.hasBag = hasBag;
		this.bag = [...bag];
		this.specialItems = [...specialItems];
		this.goldCrowns = goldCrowns;
		this.currentResist = currentResist;
	}
}

class LonewolfCombatStatus {
	constructor(combat, maxResist, resist) {
		this.combat = combat;
		this.maxResist = maxResist;
		this.resist = resist;
	}
}

export default Lonewolf;
export { LonewolfChapter, LonewolfStatus };