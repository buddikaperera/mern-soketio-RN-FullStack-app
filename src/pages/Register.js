import React, { useState } from 'react';
import Input from '../components/forms/Input';

function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	return (
		<div
			className="d-flex justify-content-center align-items-center vh-100"
			style={{ marginTop: '-45px' }}
		>
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
