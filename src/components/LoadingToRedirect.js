import React, { useEffect, useState } from 'react';
import loadingGif from '../images/spinner.gif';
import { useNavigate } from 'react-router-dom';

function LoadingToRedirect() {
	const [count, setCount] = useState(2);
	const navigate = useNavigate();

	useEffect(() => {
		const interval = setInterval(() => {
			setCount((currentCount) => --currentCount);
		}, 5);

		count === 0 && navigate('/login');
		return () => clearInterval(interval);
	}, [count]);
	return (
		<div className="d-flex justify-content-center align-items-center vh-100 ">
			<img src={loadingGif} alt="Loading.." style={{ height: '23px' }} />
		</div>
	);
}

export default LoadingToRedirect;
