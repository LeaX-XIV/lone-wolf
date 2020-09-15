import React, { useState } from 'react';
import { SimpleTable, MinusPlusCounter } from './SimpleComponents';

const CombatRecord = (props) => {

	const [chapter, setChapter] = useState('');

	const { lonewolf, enemy, inCombat } = props.combat;
	const { setEnemyCombat, setEnemyBaseResist, setLoneWolfCombat, nextChapter,
		lonewolfMinus, lonewolfPlus, enemyMinus, enemyPlus, InCombat } = props.callbacks;

	if(inCombat) {
		return (
			<>
				<SimpleTable
					className="text-center"
					id="combatRecord"
					headers={['Lone Wolf', 'Combat Ratio', 'Enemy']}
					data={[[
						<MinusPlusCounter value={lonewolf.resist} onMinus={lonewolfMinus} onPlus={lonewolfPlus} />,
						<div className="m-2">{lonewolf.combat - enemy.combat}</div>,
						<MinusPlusCounter value={enemy.resist} onMinus={enemyMinus} onPlus={enemyPlus} />
					]]}
				/>

				<button type="button" onClick={InCombat}>End Fight</button>
			</>
		);
	} else {
		return (
			<>
				<div className="row d-flex">
					<div className="col-8">
						<SimpleTable
							className="text-center"
							id="combat-setup"
							data={[[
								<label htmlFor="enemy-combat">Enemy Combat</label>,
								<input type="number" name="enemy-combat" value={enemy.combat} onChange={e => { setEnemyCombat(e.target.value) }}></input>
							], [
								<label htmlFor="enemy-resist">Enemy Resist</label>,
								<input type="number" name="enemy-resist" value={enemy.baseResist} onChange={e => { setEnemyBaseResist(e.target.value) }}></input>
							], [
								<label htmlFor="lw-combat">Lone Wolf Combat</label>,
								<input type="number" name="lw-combat" value={lonewolf.combat} onChange={e => { setLoneWolfCombat(e.target.value) }}></input>
							]]}
						/>
						<button type="button" onClick={InCombat}>Start Fight</button>
					</div>
					<div className="col-3">
						<SimpleTable
							className="text-center"
							id="next-chapter"
							data={[
								[<label htmlFor="next-chapter">Next Chapter</label>],
								[<input type="text" name="next-chapter" value={chapter} onChange={e => {
									let c = e.target.value;
									if(c === '' || (!isNaN(Number(c)) && c > 0)) {
										setChapter(c);
									}
								}} />],
								[<button type="button" onClick={() => {
									if(chapter) {
										nextChapter(chapter);
										setChapter('');
									}
								}}>Continue</button>]
							]}
						/>

					</div>
				</div>
			</>
		);
	}

	// return (
	// <>
	// 	<button type="button" className="btn btn-lg bg-danger">placeholder for fight button</button>
	// </>

}


export default CombatRecord;