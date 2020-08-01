import React, { useState, useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';

import { SmallTitle, MinusButton, PlusButton, SimpleTable, ItemWithHoverTooltip } from './SimpleComponents';

const Armaments = (props) => {
	const modes = {
		SHOW: 'show',
		SELECT: 'select'
	}

	const [mode, setMode] = useState(modes.SHOW);
	const [inputValue, setInputValue] = useState('');

	const { armaments } = props;
	const { addArmament, removeArmament } = props.callbacks;

	const { getArmaments, getItemFromId } = useContext(ItemsContext);

	function limitToN(n, arr) {
		return arr.concat(Array(n).fill(undefined)).slice(0, n);
	}

	function to2ColumnsArray(linArr) {
		let left = linArr.filter((e, i) => i % 2 === 0);
		let right = linArr.filter((e, i) => i % 2 === 1);

		return left.map((e, i) => [e, right[i]]);
	}


	const equip = to2ColumnsArray(
		limitToN(2,
			armaments.map((id, i) => {

				const item = getItemFromId(id);

				return (
					<div className="d-flex flex-row">
						<div className="col-9 p-1">
							<ItemWithHoverTooltip key={id} text={item.name} tooltip={item.description} />
						</div>
						<div className="col-3 p-1">
							<MinusButton onClick={() => { removeArmament(i) }} />
						</div>
					</div>
				);
			}
			).concat(
				<div className="d-flex flex-row">
					<div className="col-12 p-1">
						<PlusButton className="col-12" onClick={() => { setMode(modes.SELECT) }} />
					</div>
				</div>)
		)
	);

	if(mode === modes.SHOW) {
		return (
			<>
				<SmallTitle>Armaments</SmallTitle>
				<div className="d-flex flex-row">
					<SimpleTable
						className="col-12"
						id={'armaments'}
						data={equip}
					/>
				</div>
			</>
		);
	} else if(mode === modes.SELECT) {
		return (
			<div style={{ position: 'relative' }}>
				<SmallTitle>Armaments</SmallTitle>
				<div className="d-flex flex-row">
					<MinusButton
						className="col-1"
						onClick={() => { setMode(modes.SHOW) }}
					/>
					<input
						className="col-9 form-control-xl m-2 p-3"
						type="text"
						value={inputValue}
						onChange={e => { setInputValue(e.target.value) }}
					/>
					{inputValue.length > 0 ?
						<div className="bg-white" style={{ position: 'absolute', zIndex: '99', top: "80%", left: "10%" }}>
							{getArmaments().filter(a => a.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())).map(a =>
								<div
									key={a.name}
									className="p-2 mt-3 mx-3"
									onClick={() => { setInputValue(a.name); }}
								>
									{a.name}
								</div>)}
						</div>
						: <></>
					}
					<PlusButton
						className="col-1"
						onClick={() => {
							const selected = getArmaments().filter(a => a.name === inputValue)[0] || undefined;
							if(selected) {
								addArmament(selected._id);
								setInputValue("");
								setMode(modes.SHOW);
							}
						}} />
				</div>
			</div >
		);
	}




}

export default Armaments;