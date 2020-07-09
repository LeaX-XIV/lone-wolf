import React, { useState } from 'react';

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
			// show={(focused !== undefined && focused === index) || (hovering && focused === undefined)}
			show={(focused !== undefined && focused === index) || (!exclusive && hovering) || (focused === undefined && hovering)}
			onFocus={e => setFocused(index)}
			onBlur={e => setFocused(undefined)}
			onMouseEnter={e => setHovering(true)}
			onMouseLeave={e => setHovering(false)}
		/>
	);
}

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

const ItemWithTooltip = (props) => {
	const { text, tooltip, show, onMouseEnter, onMouseLeave, onFocus, onBlur } = props;

	return (
		<div className="d-flex flex-column"
			style={{ position: 'relative' }}
		>
			<button type="button" className="btn btn-lg btn-primary m-2 p-3"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onFocus={onFocus}
				onBlur={onBlur}
			>
				{text}
			</button>
			<div className={`popover ml-2 fade ${show ? 'show' : ''}`} role="tooltip" id={`${text}popover`}
				style={{ position: 'absolute', top: '100%', left: '-25%', width: '150%' }}
			>
				<h3 className="popover-header text-dark">{text}</h3>
				<div className="popover-body">{tooltip}</div>
			</div>
		</div>
	);
}

export default KaiDisciplines;