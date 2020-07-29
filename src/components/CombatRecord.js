import React from 'react';
import { SimpleTable, MinusPlusCounter } from './SimpleComponents';

const CombatRecord = (props) => {

	const { lonewolf, enemy } = props.combat;
	const { lonewolfMinus, lonewolfPlus, enemyMinus, enemyPlus } = props.callbacks;

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
		</>
	);

	// return (
	// <>
	// 	<button type="button" className="btn btn-lg bg-danger">placeholder for fight button</button>
	// </>

}


export default CombatRecord;