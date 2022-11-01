import React, { useContext, useState } from 'react';
import Input from '../components/forms/Input';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import { saveInLocalStorage } from '../helpers/auth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/forms/Button';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [auth, setAuth] = useContext(AuthContext);

	const navigate = useNavigate();

	console.log('context ====>', auth);

	const toastId = React.useRef(null);

	///console.log('API', process.env.REACT_APP_API);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/signin`,
				{
					email,
					password,
				}
			);

			if (data.error) {
				toast.error(data.error, { isOpen: false });
				return '';
			} else {
				///toast.success('User successfully registered..!');
				///window.location.href('/login');

				setAuth(data);
				//localStorage.setItem('auth', JSON.stringify(data));
				saveInLocalStorage('auth', data);
				console.log(data);
				///setTimeout(() => {
				navigate('/');
				///}, 1500);
			}
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center vh-100"
			style={{ marginTop: '-45px' }}
		>
			<Toaster />
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<h2 className="fw-bold mb-3">Login </h2>
						<form>
							<Input
								value={email}
								setValue={setEmail}
								type="email"
								label="E-mail"
							/>
							<Input
								value={password}
								setValue={setPassword}
								type="password"
								label="Password"
							/>

							<Button
								handleSubmit={handleSubmit}
								type="submit"
								clsName="btn btn-primary"
								email={email}
								password={password}
								btnLabel="Submit"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
