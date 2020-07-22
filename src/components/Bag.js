import React from 'react';

import { SmallTitle, PlusButton, SimpleTable, ItemWithHoverTooltip } from './SimpleComponents';

const Bag = (props) => {

	const { bag } = props;

	function limitToN(n, arr) {
		return arr.concat(Array(n).fill(undefined)).slice(0, n);
	}

	function to2ColumnsArray(linArr) {
		let left = linArr.filter((e, i) => i % 2 === 0);
		let right = linArr.filter((e, i) => i % 2 === 1);

		return left.map((e, i) => [e, right[i]]);
	}

	let data =
		to2ColumnsArray(
			limitToN(8,
				bag.items.map(e => <ItemWithHoverTooltip key={e._id} text={e.name} tooltip={e.description} />)
					.concat(<PlusButton onClick={() => { }} />)
			)
		);

	return (<>

		<SmallTitle>Bag</SmallTitle>
		<SimpleTable
			id={'bagItem'}
			data={data}
		/>

	</>);

}

export default Bag;