import React, { useState, useEffect } from 'react';
import { SimpleTable } from './SimpleComponents';

const DestinyTable = (props) => {

	const [table, setTable] = useState([]);
	const [selected, setSelected] = useState(3);
	const [mode, setMode] = useState("select");
	const [time] = useState(2000);

	useEffect(() => {
		function randomize() {
			let data = [];
			for(let i = 0; i < 10; i++) {
				let row = [];
				for(let j = 0; j < 10; j++)
					row.push(Math.floor(Math.random() * 10));
				data.push(row);
			}
			return data;
		}

		if(mode === "show") {
			const timer = setTimeout(() => setMode(m => m === "show" ? "select" : m), time);
			return () => clearTimeout(timer);
		} else if(mode === "select") {
			setTable(randomize());
			// setMode("show");
		}
	}, [mode, time]);

	return (
		<>
			<div className="col-12 d-flex justify-content-center mt-3">
				<SimpleTable className="table-bordered noselect" id="destinyTable"
					data={table}
					hideData={true}
					onClick={
						mode === "select"
							? (number) => {
								console.log(number);
								setSelected(number);
								setMode("show");
							}
							: undefined
					}
				/>
				{mode === "show" && <div className="text-light noselect" id="overlay">{selected}</div>}
			</div>
		</>
	);
}

export default DestinyTable;