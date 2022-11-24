import React, { useContext, useEffect, useState } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//import axios from 'axios';

//import useSearch from '../../hooks/useSearch';

export default function Timer({ time }) {
	const [realtime, setRealtime] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			setRealtime(dayjs(time).add(1, 'second').fromNow());
		}, 1000);
		return () => clearInterval(interval);
	});

	return <React.Fragment>{realtime}</React.Fragment>;
}
