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
					<div className="d-flex flex-row">
						<div className="col-9 p-1">
							<ItemWithHoverTooltip key={id} text={item.name} tooltip={item.description} />
						</div>
						<div className="col-3 p-1">
							<MinusButton onClick={() => { }} />
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
		)
	);

	return (
		<>
			<div className="d-flex flex-wrap">
				<div className="col-12">
					<SmallTitle>Armaments</SmallTitle>
					<SimpleTable
						className="col-12"
						id={'specialItems'}
						data={equip}
					/>
				</div>
			</div>
		</>
	);
}

export default Armaments;