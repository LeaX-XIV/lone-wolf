import React, { useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';

import { SmallTitle, MinusButton, PlusButton, SimpleTable, ItemWithHoverTooltip } from './SimpleComponents';

const Bag = (props) => {

	const { bag } = props;

	const { getItemFromId } = useContext(ItemsContext);

	function limitToN(n, arr) {
		return arr.concat(Array(n).fill(undefined)).slice(0, n);
	}

	function to2ColumnsArray(linArr) {
		let left = linArr.filter((e, i) => i % 2 === 0);
		let right = linArr.filter((e, i) => i % 2 === 1);

		return left.map((e, i) => [e, right[i]]);
	}

	const bagItems =
		to2ColumnsArray(
			limitToN(8,
				bag.items.map(id => {

					const item = getItemFromId(id);

					return (
						<div className="d-flex flex-row">
							<div className="col-9 p-1">
								<ItemWithHoverTooltip key={id} text={item.name} tooltip={item.description} />
							</div>
							<div className="col-3 p-1">
								<MinusButton className="col-3" onClick={() => { }} />
							</div>
						</div >
					);
				}
				).concat(
					<div className="d-flex flex-row">
						<div className="col-12 p-1">
							<PlusButton className="col-12" onClick={() => { }} />
						</div>
					</div>)
			)
		);

	const specialItems =
		to2ColumnsArray(
			bag.specialItems.map(id => {

				const item = getItemFromId(id);

				return (
					<div className="d-flex flex-row">
						<div className="col-9 p-1">
							<ItemWithHoverTooltip key={id} text={item.name} tooltip={item.description} />
						</div>
						<div className="col-3 p-1">
							<MinusButton className="col-3" onClick={() => { }} />
						</div>
					</div>
				);
			}
			).concat(
				<div className="d-flex flex-row">
					<div className="col-12 p-1">
						<PlusButton className="col-12" onClick={() => { }} />
					</div>
				</div>)
		);

	return (
		<div className="d-flex flex-wrap">
			<div className="col-5">
				<SmallTitle>Bag</SmallTitle>
				{bag.hasBag ?
					<SimpleTable
						className="table-sm col-5"
						id={'bagItem'}
						data={bagItems}
					/> :
					<div class="alert alert-danger" role="alert">You lost your bag</div>
				}
			</div>
			<div className="col-5">
				<SmallTitle>Special Items</SmallTitle>
				<SimpleTable className="table-sm col-5" id={'specialItems'} data={specialItems} />
			</div>

			<div className="col-2">
				<SmallTitle>Gold Crowns</SmallTitle>
				<MinusButton onClick={() => { }} />
				<span className='h3'>{bag.goldCrowns}</span>
				<PlusButton onClick={() => { }} />
			</div>
		</div>
	);

}

export default Bag;