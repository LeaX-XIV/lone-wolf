import React, { useState, useEffect } from 'react';
import './App.css';
import Lonewolf, { LonewolfChapter, LonewolfStatus } from './entities/lonewolf';
// import { PlusButton, MinusButton, LeftArrow, RightArrow, SimpleTable, Table } from './components/SimpleComponents'
import Status from './components/Status';
import CombatRecord from './components/CombatRecord';
import DestinyTable from './components/DestinyTable';
import KaiDisciplines from './components/KaiDisciplines';
import Bag from './components/Bag';
import Armaments from './components/Armaments';
import Chapters from './components/Chapters';

import { saveAs } from 'file-saver';

function App() {
	const [update, setUpdate] = useState(0);

	const [l, setL] = useState(new Lonewolf(18, 24, [new LonewolfChapter(1, new LonewolfStatus([0, 1, 2, 3, 4], [14, 10], true, [11, 18, 20, 25], [19], 20, 21))]));
	const [status, setStatus] = useState(undefined);
	const [kaiDisciplines, setKaiDisciplines] = useState(undefined);
	const [armaments, setArmaments] = useState(undefined);
	const [bag, setBag] = useState(undefined);
	const [chapters, setChapters] = useState(undefined);

	useEffect(() => {
		setStatus(l.getStatus());
		setKaiDisciplines(l.getKaiDisciplines());
		setArmaments(l.getArmaments());
		setBag(l.getBag());
		setChapters(l.getListOfChapters().reverse());
		console.log(l)
	}, [l, update]);

	function doUpdate() {
		setUpdate(u => u + 1);
	}

	useEffect(() => {
		setL(new Lonewolf(18, 24, [new LonewolfChapter(1, new LonewolfStatus([0, 1, 2, 3, 4], [14, 10], true, [11, 18, 20, 25], [19], 20, 21))]));
		doUpdate();
	}, []);


	if(l && status && kaiDisciplines && armaments && bag && chapters) {
		return (
			<div className="row vheight-100 d-flex">
				<div className="col-4 d-flex flex-column">
					<Status status={status} />
					<CombatRecord
						combat={{
							lonewolf: status,
							enemy: {
								combat: 15,
								baseResist: 19,
								resist: 19
							}
						}}
						callbacks={{
							lonewolfMinus: () => { l.setCurrentResist(status.resist - 1); doUpdate(); },
							lonewolfPlus: () => { l.setCurrentResist(status.resist + 1); doUpdate(); },
							enemyMinus: () => { },
							enemyPlus: () => { },
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
							addArmament: () => { l.addCurrentArmament(10); doUpdate(); },
							removeArmament: (i) => { l.removeCurrentArmamentAtIndex(i); doUpdate(); }
						}}
					/>
					<Bag
						bag={bag}
						callbacks={{
							addBagItem: () => { l.addCurrentBagItem(17); doUpdate(); },
							removeBagItem: (i) => { l.removeCurrentBagItemAtIndex(i); doUpdate(); },
							addSpecialItem: () => { l.addCurrentSpecialItem(19); doUpdate() },
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
		return (<></>);
	}
}

export default App;