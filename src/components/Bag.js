import React, { useState, useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';

import { SmallTitle, MinusButton, PlusButton, SimpleTable, ItemWithHoverTooltip, MinusPlusCounter } from './SimpleComponents';

const Bag = (props) => {
	const modes = {
		SHOW: 'show',
		SELECT: 'select'
	}

	const [bagMode, setBagMode] = useState(modes.SHOW);
	const [bagInputValue, setBagInputValue] = useState('');

	const [specialItemsMode, setSpecialItemsMode] = useState(modes.SHOW);
	const [specialItemsInputValue, setSpecialItemsInputValue] = useState('');

	const { bag } = props;
	const { addBagItem, removeBagItem, addSpecialItem, removeSpecialItem, addGoldCrowns, removeGoldCrowns } = props.callbacks;

	const { getBagItems, getSpecialItems, getItemFromId } = useContext(ItemsContext);

	function limitToN(n, arr) {
		return arr.slice(0, n);
	}

	function to2ColumnsArray(linArr) {
		let left = linArr.filter((e, i) => i % 2 === 0);
		let right = linArr.filter((e, i) => i % 2 === 1);

		return left.map((e, i) => [e, right[i]]);
	}

	const bagItems =
		to2ColumnsArray(
			limitToN(8,
				bag.items.map((id, i) => {

					const item = getItemFromId(id);

					return (
						<div className="d-flex flex-row">
							<div className="col-9 p-1">
								<ItemWithHoverTooltip key={id} text={item.name} tooltip={item.description} />
							</div>
							<div className="col-3 p-1">
								<MinusButton className="col-3" onClick={() => { removeBagItem(i) }} />
							</div>
						</div >
					);
				}
				).concat(
					<div className="d-flex flex-row">
						<div className="col-12 p-1">
							<PlusButton className="col-12" onClick={() => { setBagMode(modes.SELECT) }} />
						</div>
					</div>)
			)
		);

	const specialItems =
		to2ColumnsArray(
			bag.specialItems.map((id, i) => {

				const item = getItemFromId(id);

				return (
					<div className="d-flex flex-row">
						<div className="col-9 p-1">
							<ItemWithHoverTooltip key={id} text={item.name} tooltip={item.description} />
						</div>
						<div className="col-3 p-1">
							<MinusButton className="col-3" onClick={() => { removeSpecialItem(i) }} />
						</div>
					</div>
				);
			}
			).concat(
				<div className="d-flex flex-row">
					<div className="col-12 p-1">
						<PlusButton className="col-12" onClick={() => { setSpecialItemsMode(modes.SELECT) }} />
					</div>
				</div>)
		);

	return (
		<div className="d-flex flex-wrap">
			<div className="col-5">
				<SmallTitle>Bag</SmallTitle>
				{bagMode === modes.SHOW ?
					bag.hasBag ?
						<SimpleTable
							className="table-sm col-5"
							id={'bagItem'}
							data={bagItems}
						/> :
						<div class="alert alert-danger" role="alert">You lost your bag</div> :
					<div style={{ position: 'relative' }}>
						<div className="d-flex flex-row">
							<MinusButton
								className="col-1"
								onClick={() => { setBagMode(modes.SHOW) }}
							/>
							<input
								className="col-9 form-control-xl m-2 p-3"
								type="text"
								value={bagInputValue}
								onChange={e => { setBagInputValue(e.target.value) }}
							/>
							{bagInputValue.length > 0 ?
								<div className="bg-white" style={{ position: 'absolute', zIndex: '99', top: "80%", left: "10%" }}>
									{getBagItems()
										.filter(a => a.name.toLocaleLowerCase() !== bagInputValue.toLocaleLowerCase() &&
											a.name.toLocaleLowerCase().startsWith(bagInputValue.toLocaleLowerCase()))
										.map(a =>
											<div
												key={a.name}
												className="p-2 mt-3 mx-3"
												onClick={() => { setBagInputValue(a.name); }}
											>
												{a.name}
											</div>)
									}
								</div>
								: <></>
							}
							<PlusButton
								className="col-1"
								onClick={() => {
									const selected = getBagItems().filter(a => a.name === bagInputValue)[0] || undefined;
									if(selected) {
										addBagItem(selected._id);
										setBagInputValue("");
										setBagMode(modes.SHOW);
									} else {
										// Item does not exist in global context.
										// Add to context
										// Add context extension to save file
										// Add to gag
									}
								}} />
						</div>
					</div >
				}
			</div>
			<div className="col-5">
				<SmallTitle>Special Items</SmallTitle>
				{specialItemsMode === modes.SHOW ?
					<SimpleTable className="table-sm col-5" id={'specialItems'} data={specialItems} /> :
					<div style={{ position: 'relative' }}>
						<div className="d-flex flex-row">
							<MinusButton
								className="col-1"
								onClick={() => { setSpecialItemsMode(modes.SHOW) }}
							/>
							<input
								className="col-9 form-control-xl m-2 p-3"
								type="text"
								value={specialItemsInputValue}
								onChange={e => { setSpecialItemsInputValue(e.target.value) }}
							/>
							{specialItemsInputValue.length > 0 ?
								<div className="bg-white" style={{ position: 'absolute', zIndex: '99', top: "80%", left: "10%" }}>
									{getSpecialItems()
										.filter(a => a.name.toLocaleLowerCase() !== specialItemsInputValue.toLocaleLowerCase() &&
											a.name.toLocaleLowerCase().startsWith(specialItemsInputValue.toLocaleLowerCase()))
										.map(a =>
											<div
												key={a.name}
												className="p-2 mt-3 mx-3"
												onClick={() => { setSpecialItemsInputValue(a.name); }}
											>
												{a.name}
											</div>)
									}
								</div>
								: <></>
							}
							<PlusButton
								className="col-1"
								onClick={() => {
									const selected = getSpecialItems().filter(a => a.name === specialItemsInputValue)[0] || undefined;
									if(selected) {
										addSpecialItem(selected._id);
										setSpecialItemsInputValue("");
										setSpecialItemsMode(modes.SHOW);
									} else {
										// Item does not exist in global context.
										// Add to context
										// Add context extension to save file
										// Add to special items
									}
								}} />
						</div>
					</div >
				}
			</div>

			<div className="col-2">
				<SmallTitle>Gold Crowns</SmallTitle>
				<div className="h3">
					<MinusPlusCounter value={bag.goldCrowns} onPlus={addGoldCrowns} onMinus={removeGoldCrowns} />
				</div>
			</div>
		</div>
	);

}

export default Bag;