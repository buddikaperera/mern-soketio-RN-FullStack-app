import React, { useState } from 'react';
import Input from '../components/forms/Input';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post(
				'http://localhost:8000/api/users/login',
				{
					email,
					password,
				}
			);

			if (data.error) {
				toast.error(data.error);
				return '';
			} else {
				toast.success(data.success);
				///window.location.href('/login');
				console.log(data);
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

							<button
								onClick={handleSubmit}
								type="submit"
								className="btn btn-primary"
								disabled={!email || !password}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
