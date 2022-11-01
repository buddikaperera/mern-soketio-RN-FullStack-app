import { createContext, useEffect, useState } from 'react';
import { getFromLocalStorage } from '../helpers/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState(null);

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
