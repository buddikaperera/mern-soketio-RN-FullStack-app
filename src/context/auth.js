import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { getFromLocalStorage, removeFromLocalStorage } from '../helpers/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

	///axios configuration
	axios.defaults.baseURL = process.env.REACT_APP_API;
	axios.defaults.headers.common['Authorization'] = `${auth && auth.token}`; ///express jwt use Bearer

	axios.interceptors.response.use(
		async function (response) {
			return response;
		},
		async function (error) {
			let res = error.response;

			if (res.status === 401 || res.status === 403) {
				setAuth(null);
				removeFromLocalStorage();
			}
			return Promise.reject(error);
		}
	);
	useEffect(() => {
		//const auth = getFromLocalStorage('auth');
		let value = getFromLocalStorage('auth');
		setAuth(value);
		//if (auth) {
		//setAuth(JSON.parse(auth));
		//}
	}, []);

	return (
		<AuthContext.Provider value={[auth, setAuth]}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
