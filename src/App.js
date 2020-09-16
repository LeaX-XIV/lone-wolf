import React, { useState, useEffect } from 'react';
import './App.css';
import Lonewolf, { LonewolfChapter, LonewolfStatus } from './entities/lonewolf';
import Enemy from './entities/enemy';
// import { PlusButton, MinusButton, LeftArrow, RightArrow, SimpleTable, Table } from './components/SimpleComponents'
import Status from './components/Status';
import CombatRecord from './components/CombatRecord';
import DestinyTable from './components/DestinyTable';
import KaiDisciplines from './components/KaiDisciplines';
import Bag from './components/Bag';
import Armaments from './components/Armaments';
import Chapters from './components/Chapters';

import { saveAs } from 'file-saver';
import { SmallTitle } from './components/SimpleComponents';

function App() {
	const [update, setUpdate] = useState(0);

	const [l, setL] = useState();
	// const [l, setL] = useState(new Lonewolf(18, 24, [new LonewolfChapter(1, new LonewolfStatus([0, 1, 2, 3, 4], [14, 10], true, [11, 18, 20, 25], [19], 20, 21))]));
	const [status, setStatus] = useState(undefined);
	const [kaiDisciplines, setKaiDisciplines] = useState(undefined);
	const [armaments, setArmaments] = useState(undefined);
	const [bag, setBag] = useState(undefined);
	const [chapters, setChapters] = useState(undefined);

	const [enemy] = useState(new Enemy(13, 14, 14));
	const [inCombat, setInCombat] = useState(false);

	useEffect(() => {
		if(l) {
			setStatus(l.getStatus());
			setKaiDisciplines(l.getKaiDisciplines());
			setArmaments(l.getArmaments());
			setBag(l.getBag());
			setChapters(l.getListOfChapters().reverse());
			console.log(l)
		}
	}, [l, update]);

	useEffect(() => {
		if(l && !inCombat) {
			// console.log('exit combat');
			l.resetCurrentCombat();
		}
	}, [l, inCombat]);

	function doUpdate() {
		setUpdate(u => u + 1);
	}

	// useEffect(() => {
	// 	setL(new Lonewolf(18, 24, [new LonewolfChapter(1, new LonewolfStatus([0, 1, 2, 3, 4], [13, 9], true, [10, 17, 19, 24], [18], 20, 21))]));
	// 	doUpdate();
	// }, []);


	if(l && status && kaiDisciplines && armaments && bag && chapters) {
		let combat = {
			lonewolf: l.getCombatStatus(),
			enemy: enemy,
			inCombat: inCombat
		};
		return (
			<div className="row vheight-100 d-flex">
				<div className="col-4 d-flex flex-column">
					<Status status={status} />
					<CombatRecord
						combat={combat}
						callbacks={{
							setEnemyCombat: (c) => { enemy.setCombat(c); doUpdate(); },
							setEnemyBaseResist: (br) => { enemy.setBaseResist(br); doUpdate(); },
							setLoneWolfCombat: (c) => { l.setCurrentCombat(c); doUpdate(); },
							nextChapter: (c) => { console.log(c); l.nextChapter(c); doUpdate(); },

							lonewolfMinus: () => { l.setCurrentResist(status.resist - 1); doUpdate(); },
							lonewolfPlus: () => { l.setCurrentResist(status.resist + 1); doUpdate(); },
							enemyMinus: () => { enemy.setResist(enemy.getResist() - 1); doUpdate(); },
							enemyPlus: () => { enemy.setResist(enemy.getResist() + 1); doUpdate(); },

							InCombat: () => { setInCombat(ic => !ic); doUpdate(); },
						}}
					/>
					<DestinyTable />
					<button className="btn btn-lg btn-primary" type="button" onClick={() => {
						saveAs(new Blob([JSON.stringify(l)]), `${new Date().toISOString().split('T')[0]}-Lonewolf.json`, { autoBom: true });
						console.log(l);
					}}>Save progress</button>
				</div>
				<div className="col-8 d-flex flex-column">
					<KaiDisciplines disciplines={kaiDisciplines} />
					<Armaments
						armaments={armaments}
						callbacks={{
							addArmament: (i) => { l.addCurrentArmament(i); doUpdate(); },
							removeArmament: (i) => { l.removeCurrentArmamentAtIndex(i); doUpdate(); }
						}}
					/>
					<Bag
						bag={bag}
						callbacks={{
							addBagItem: (i) => { l.addCurrentBagItem(i); doUpdate(); },
							removeBagItem: (i) => { l.removeCurrentBagItemAtIndex(i); doUpdate(); },
							addSpecialItem: (i) => { l.addCurrentSpecialItem(i); doUpdate() },
							removeSpecialItem: (i) => { l.removeCurrentSpecialItemsItemAtIndex(i); doUpdate(); },
							addGoldCrowns: () => { l.setCurrentGoldCrowns(bag.goldCrowns + 1); doUpdate(); },
							removeGoldCrowns: () => { l.setCurrentGoldCrowns(bag.goldCrowns - 1); doUpdate(); },
						}}
					/>
					<Chapters chapterList={chapters} />
				</div>
			</div>
		);
	} else {
		function loadLoneWolfFromFile(text) {

			let newLW;
			try {
				newLW = Lonewolf.fromJSON(text);
			} catch(e) {

			}
			if(newLW) {
				console.log(newLW);
				setL(newLW);
			}

		}

		return (
			<>
				<SmallTitle>Lone Wolf</SmallTitle>
				<div className="custom-file">
					<input type="file" className="custom-file-input" id="loneWolfFile" onChange={async e => {
						e.preventDefault();
						const reader = new FileReader();
						reader.onload = async e => {
							loadLoneWolfFromFile(e.target.result);
							// console.log(text);
						}
						reader.readAsText(e.target.files[0]);
					}} />
					<label class="custom-file-label" for="loneWolfFile">Choose file...</label>
				</div>
			</>
		);
	}
}

export default App;