import React, { useState } from 'react';

import { SmallTitle, LeftArrow, RightArrow } from './SimpleComponents';

const Chapters = (props) => {

	const { chapterList } = props;

	const [indexFocus, setIndexFocus] = useState(0);

	function mapRange(x, min1, max1, min2, max2) {
		return (x - min1) * (max2 - min2) / (max1 - min1) + min2;
	}

	return (
		<>
			<SmallTitle>Chapters</SmallTitle>
			<div className="d-flex justify-content-between" style={{ position: 'relative' }}>
				<LeftArrow classNamE="col-1" onClick={() => { setIndexFocus(i => i > 0 ? i - 1 : i) }} />
				{chapterList.slice(indexFocus, indexFocus + 9).map((c, i) => <div key={c} className={`col-1 m-2 p-3 text-center noselect h${indexFocus === 0 && i === 0 ? '2 font-weight-bold' : '3'}`}>{c}</div>)}
				<RightArrow classNamE="col-1" onClick={() => { setIndexFocus(i => i < chapterList.length - 9 ? i + 1 : i) }} />
				<span className="col-1 bg-primary" style={{ position: 'absolute', height: '2px', top: '80%', left: `${mapRange(indexFocus, 0, Math.max(0, chapterList.length - 9), 5, 86)}%` }}></span>
			</div>
		</>
	);
}

export default Chapters;