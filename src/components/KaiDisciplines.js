import React, { useState, useContext } from 'react';
import { SmallTitle, ItemWithHoverFocusTooltip } from './SimpleComponents';
import { KaiDisciplinesContext } from '../contexts/KaiDisciplinesContext';

const KaiDisciplines = (props) => {

	const [focused, setFocused] = useState();
	const { disciplines } = props;

	const { getDisciplineFromId } = useContext(KaiDisciplinesContext);

	return (
		<>
			<SmallTitle>Kai Disciplines</SmallTitle>
			<div className="d-flex flex-row justify-content-around">
				{disciplines.map((id, i) => {

					const discipline = getDisciplineFromId(id);

					return <ItemWithHoverFocusTooltip key={`${id}`}
						text={discipline.name}
						tooltip={discipline.description}
						index={i}
						exclusive={true}
						focused={focused}
						setFocused={setFocused}
					/>
				})}
			</div>
		</>
	);
}

export default KaiDisciplines;