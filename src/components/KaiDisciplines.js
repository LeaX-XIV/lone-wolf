import React, { useState } from 'react';
import { SmallTitle, ItemWithHoverFocusTooltip } from './SimpleComponents';

const KaiDisciplines = (props) => {

	const [focused, setFocused] = useState();
	const { disciplines } = props;

	return (
		<>
			<SmallTitle>Kai Disciplines</SmallTitle>
			<div className="d-flex flex-wrap ">
				{disciplines.map((d, i) => <ItemWithHoverFocusTooltip key={`${d._id}`}
					text={d.name}
					tooltip={d.description}
					index={i}
					exclusive={true}
					focused={focused}
					setFocused={setFocused}
				/>)}
			</div>
		</>
	);
}

export default KaiDisciplines;