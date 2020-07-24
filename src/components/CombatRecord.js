import React from 'react';
import { SimpleTable } from './SimpleComponents';

const CombatRecord = (props) => {

	const { lonewolf, enemy, extracted } = props.combat;

	if(lonewolf && enemy) {
		return (
			<>
				<SimpleTable
					className="text-center"
					id="combatRecord"
					headers={['Lone Wolf', 'Combat Ratio', 'Enemy']}
					data={[[lonewolf.resist, lonewolf.combat - enemy.combat, 6]]}
				/>
			</>
		);
	} else {
		return (
			<>
				<button type="button" className="btn btn-lg bg-danger">placeholder for fight button</button>
			</>
		);
	}
}


export default CombatRecord;