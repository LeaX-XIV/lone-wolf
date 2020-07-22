import React, { useContext } from 'react';
import { ItemsContext } from '../contexts/ItemsContext';

import { SmallTitle, MinusButton, PlusButton, SimpleTable, ItemWithHoverTooltip } from './SimpleComponents';

const Armaments = (props) => {
	const { armaments } = props;

	const { getItemFromId } = useContext(ItemsContext);

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
			armaments.map(id => {

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

	return (
		<>
			<SmallTitle>Armaments</SmallTitle>
			<SimpleTable
				id={'specialItems'}
				data={equip}
			/>
		</>
	);
}

export default Armaments;