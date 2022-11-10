import React, { useContext, useState } from 'react';
import Input from '../components/forms/Input';
import toast from 'react-hot-toast';
import axios from 'axios';
import { AuthContext } from '../context/auth';
import { saveInLocalStorage } from '../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/forms/Button';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [auth, setAuth] = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	console.log('context ====>', auth);

	const toastId = React.useRef(null);

	///console.log('API', process.env.REACT_APP_API);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			const { data } = await axios.post(`/signin`, {
				email,
				password,
			});

			if (data.error) {
				toast.error(data.error, { isOpen: false });
				setLoading(false);
				return '';
			} else {
				toast.success('Successfully logged in ..!');
				///window.location.href('/login');

				setAuth(data);
				//localStorage.setItem('auth', JSON.stringify(data));
				saveInLocalStorage('auth', data);
				console.log(data);
				setLoading(false);
				///setTimeout(() => {
				navigate('/dashboard');
				///}, 1500);
			}
		} catch (error) {
			console.log('error', error);
			setLoading(false);
		}
	};

	return (
		<div
			className="d-flex justify-content-center align-items-center vh-100"
			style={{ marginTop: '-45px' }}
		>
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
								loading={loading}
							/>
						</form>
						<p className="mt-3">
							<Link to="/forgot-password">Forgot password?</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
