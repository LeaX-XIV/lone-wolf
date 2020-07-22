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
						<div
							className="d-flex flex-row"
						>
							<ItemWithHoverTooltip key={id} className='col-10' text={item.name} tooltip={item.description} />
							<MinusButton className='col-2' onClick={() => { }} />
						</div>
					);
				}
				).concat(<PlusButton className="col-12" onClick={() => { }} />)
			)
		);

	const specialItems =
		to2ColumnsArray(
			bag.specialItems.map(id => {

				const item = getItemFromId(id);

				return (
					<div
						className="d-flex flex-row"
					>
						<ItemWithHoverTooltip key={id} className={'col-10'} text={item.name} tooltip={item.description} />
						<MinusButton className={'col-2'} onClick={() => { }} />
					</div>
				);
			}
			).concat(<PlusButton className='col-12' onClick={() => { }} />)
		);

	return (<>
		<SmallTitle>Bag</SmallTitle>
		{bag.hasBag ?
			<SimpleTable
				id={'bagItem'}
				data={bagItems}
			/> :
			<div class="alert alert-danger" role="alert">You lost your bag</div>
		}

		<SmallTitle>Special Items</SmallTitle>
		<SimpleTable
			id={'specialItems'}
			data={specialItems}
		/>

		<SmallTitle>Gold Crowns</SmallTitle>
		<MinusButton onClick={() => { }} />
		<span className='h3'>{bag.goldCrowns}</span>
		<PlusButton onClick={() => { }} />
	</>);

}

export default Bag;