import React, { useState } from 'react';

const SmallTitle = (props) => {
	return <h4 className="p-3 mt-5">{props.children}</h4>
}

function MinusButton(props) {
	return (
		<button type='button' className={`btn btn-danger btn-lg m-2 p-3 ${props.className}`}
			onClick={props.onClick}
		>
			<svg className="bi bi-dash"
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd"
					d="M3.5 8a.5.5 0 01.5-.5h8a.5.5 0 010 1H4a.5.5 0 01-.5-.5z"
					clipRule="evenodd" />
			</svg>
		</button>
	);
}

function PlusButton(props) {
	return (
		<button type='button' className={`btn btn-success btn-lg m-2 p-3 ${props.className}`}
			onClick={props.onClick}
		>
			<svg className="bi bi-plus"
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path fillRule="evenodd"
					d="M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z"
					clipRule="evenodd" />
				<path fillRule="evenodd"
					d="M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z"
					clipRule="evenodd" />
			</svg>
		</button>
	);
}

function LeftArrow(props) {
	return (
		<button type='button' className={`btn btn-primary btn-lg m-2 p-3 ${props.className}`}
			onClick={props.onClick}
		>
			<svg className="bi bi-caret-left-fill"
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 00-1.659-.753l-5.48 4.796a1 1 0 000 1.506z" />
			</svg>
		</button>
	);
}

function RightArrow(props) {
	return (
		<button type='button' className={`btn btn-primary btn-lg m-2 p-3 ${props.className}`}
			onClick={props.onClick}
		>
			<svg className="bi bi-caret-right-fill"
				width="1em"
				height="1em"
				viewBox="0 0 16 16"
				fill="currentColor"
				xmlns="http://www.w3.org/2000/svg">
				<path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 011.659-.753l5.48 4.796a1 1 0 010 1.506z" />
			</svg>
		</button>
	);
}

function SimpleTable(props) {
	return (<>
		<table className={"table " + (props.className || "")} id={props.id || ""}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
		>
			{props.headers && <thead><tr>{props.headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead>}
			<tbody>
				{props.data &&
					props.data.map((row, i) => {
						return (
							<tr key={i}>
								{row.map((data, j) => {
									return (
										<SimpleTableCell
											key={`${i}x${j}`}
											className={`${props.id}Cell`}
											data={props.hideData ? "" : data}
											onClick={props.onClick ? () => props.onClick(data) : () => { }}
										/>)
								})}
							</tr>
						);
					})
				}
			</tbody>
		</table>

		{props.children && props.children}
	</>
	);
}

function SimpleTableCell(props) {
	return (
		<td
			className={props.className ? props.className : ""}
			onClick={props.onClick}>
			{props.data}
		</td>
	);
}

function Table(props) {

	let xHeaders = props.headers.concat(<PlusButton onClick={props.add} />);
	let xData = props.data.map((row, i) => row.concat(<MinusButton onClick={() => props.remove(i)} />));

	return (
		<SimpleTable headers={xHeaders} data={xData} />
	);
}

const ItemWithTooltip = (props) => {
	const { text, tooltip, show, onMouseEnter, onMouseLeave, onFocus, onBlur } = props;

	return (
		<div
			className="d-flex flex-column"
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
			{tooltip && <div className={`popover ml-2 fade ${show ? 'show' : ''}`} role="tooltip" id={`${text}popover`}
				style={{ position: 'absolute', top: '100%', /*left: '-25%',*/ width: '150%' }}
			>
				<h3 className="popover-header text-dark">{text}</h3>
				<div className="popover-body">{tooltip}</div>
			</div>}
		</div>
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

export { SmallTitle, MinusButton, PlusButton, LeftArrow, RightArrow, SimpleTable, Table, ItemWithTooltip, ItemWithHoverFocusTooltip, ItemWithHoverTooltip, ItemWithFocusTooltip };