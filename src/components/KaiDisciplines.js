import React, { useState } from 'react';
import { ItemWithTooltip } from './SimpleComponents';

const KaiDisciplines = (props) => {

	const [focused, setFocused] = useState();
	const { disciplines } = props;

	return (
		<>
			<h4 className="p-3 mt-5">Kai Disciplines</h4>
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

const ItemWithHoverFocusTooltip = (props) => {
	const { text, tooltip, index, exclusive, focused, setFocused } = props;

	const [hovering, setHovering] = useState(false);

	return (
		<ItemWithTooltip
			text={text}
			tooltip={tooltip}
			show={(focused !== undefined && focused === index) || (!exclusive && hovering) || (focused === undefined && hovering)}
			onFocus={e => setFocused(index)}
			onBlur={e => setFocused(undefined)}
			onMouseEnter={e => setHovering(true)}
			onMouseLeave={e => setHovering(false)}
		/>
	);
}

// eslint-disable-next-line no-unused-vars
const ItemWithHoverTooltip = (props) => {
	const { text, tooltip } = props;

	const [hovering, setHovering] = useState(false);

	return (
		<ItemWithTooltip
			text={text}
			tooltip={tooltip}
			show={hovering}
			onFocus={e => e.target.blur()}
			onMouseEnter={e => setHovering(true)}
			onMouseLeave={e => setHovering(false)}
		/>
	);
}

// eslint-disable-next-line no-unused-vars
const ItemWithFocusTooltip = (props) => {
	const { text, tooltip, index, focused, setFocused } = props;

	return (
		<ItemWithTooltip
			text={text}
			tooltip={tooltip}
			show={(focused !== undefined && focused === index)}
			onFocus={e => setFocused(index)}
			onBlur={e => setFocused(undefined)}
		/>
	);
}

export default KaiDisciplines;