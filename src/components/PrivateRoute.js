import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth';
import { useNavigate, Outlet } from 'react-router-dom';
import LoadingToRedirect from './LoadingToRedirect';
import axios from 'axios';

function PrivateRoute() {
	const [auth, setAuth] = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	const navigate = useNavigate();

	const data = {};

	console.log('AUTH auth --->', auth);

	useEffect(() => {
		const authCheck = async () => {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API}/auth-check`,
				{
					headers: {
						Authorization: auth.token,
					},
				}
			);

			//console.log('AUTH CHECK RESPONSE DATA --->', data);
			//console.log('AUTH CHECK RESPONSE DATA --->', data.ok);

			console.log('data', data);
		};

		if (!auth && !data.ok) {
			///(!auth) {
			console.log('NOOO');
			setLoading(true);
		} else {
			setLoading(false);

			console.log('sssssss');
		}
		if (auth) authCheck();
	}, [auth]);

	return loading ? <LoadingToRedirect /> : <Outlet />;
}

export default PrivateRoute;
