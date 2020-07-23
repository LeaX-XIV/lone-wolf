import React from 'react';
import { SmallTitle } from './SimpleComponents';

const Status = (props) => {

	const { combat, resist, baseResist } = props.status;

	return (
		<div className="d-flex flex-row content-justify-around">
			<div className="col-6 text-center">
				<SmallTitle>
					<svg className="bi bi-heart-fill text-danger px-2" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
					</svg>
					{resist} / {baseResist}
				</SmallTitle>
			</div>
			<div className="col-6 text-center">
				<SmallTitle>
					<svg className="bi bi-heart-fill text-success px-2" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
					</svg>
					{combat}
				</SmallTitle>
			</div>
		</div>
	);
}

export default Status;