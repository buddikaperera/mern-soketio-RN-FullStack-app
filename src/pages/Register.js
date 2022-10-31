import React, { useState } from 'react';
import Input from '../components/forms/Input';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (password !== confirmPassword) {
				toast.error(
					'Password does not match with the confirm password!'
				);
				return '';
			} else {
				//console.log('done', { name, email, password, confirmPassword });
				const { data } = await axios.post(
					'http://localhost:8000/api/users/register',
					{
						name,
						email,
						password,
						confirmPassword,
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
						<h2 className="fw-bold mb-3">Register </h2>
						<form>
							<Input
								value={name}
								setValue={setName}
								type="text"
								label="Name"
							/>
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

							<Input
								value={confirmPassword}
								setValue={setConfirmPassword}
								type="password"
								label="Confirm Password"
							/>

							<button
								onClick={handleSubmit}
								type="submit"
								className="btn btn-primary"
								disabled={
									!email ||
									!password ||
									!name ||
									!confirmPassword
								}
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

export default Register;
