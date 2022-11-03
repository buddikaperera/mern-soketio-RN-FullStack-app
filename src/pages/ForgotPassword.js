import React, { Fragment, useState } from 'react';
import Input from '../components/forms/Input';
import toast from 'react-hot-toast';
import axios from 'axios';

//import { saveInLocalStorage } from '../helpers/auth';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/forms/Button';

function ForgotPassword() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [visible, setVisible] = useState(false);

	const [resetCode, setResetCode] = useState('');

	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	///console.log('API', process.env.REACT_APP_API);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			//if (password !== confirmPassword) {
			//setLoading(false);
			//	toast.error(
			//'Password does not match with the confirm password!'
			//);

			//	return '';
			//} else {
			//console.log('done', { name, email, password, confirmPassword });
			const { data } = await axios.post(
				`${process.env.REACT_APP_API}/forgot-password`,
				{
					email,
				}
			);

			if (data.error) {
				toast.error(data.error, { isOpen: false });
				setLoading(false);
				return '';
			} else {
				toast.success('Enter the code received in your email..!');
				///window.location.href('/login');

				//	setAuth(data);
				//localStorage.setItem('auth', JSON.stringify(data));
				//	saveInLocalStorage('auth', data);
				setLoading(false);
				console.log(data);
				setVisible(true);
			}
		} catch (error) {
			console.log('error', error);
			setLoading(false);
		}
	};

	const handleReset = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			if (password !== confirmPassword) {
				setLoading(false);
				toast.error(
					'Password does not match with the confirm password!'
				);

				return '';
			} else {
				//console.log('done', { name, email, password, confirmPassword });
				const { data } = await axios.post(
					`${process.env.REACT_APP_API}/reset-password`,
					{
						email,
						resetCode,
						password,
						confirmPassword,
					}
				);

				if (data.error) {
					toast.error(data.error, { isOpen: false });
					setLoading(false);
					return '';
				} else {
					toast.success(
						'Password successfully changed..!Now you can login with the new password!'
					);
					///window.location.href('/login');

					///setAuth(data);
					//localStorage.setItem('auth', JSON.stringify(data));
					//	saveInLocalStorage('auth', data);
					setLoading(false);
					//	console.log(data);
					//setTimeout(() => {
					//navigate('/login');
					//}, 1500);
				}
			}
		} catch (error) {
			console.log('error', error);
			toast.error('someting went wrong ..!');
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
						<h2 className="fw-bold mb-3">Forgot Password </h2>
						<form>
							<Input
								value={email}
								setValue={setEmail}
								type="email"
								label="E-mail"
							/>

							{visible && (
								<React.Fragment>
									<Input
										value={resetCode}
										setValue={setResetCode}
										type="text"
										label="Enter reset code"
									/>
									<Input
										value={password}
										setValue={setPassword}
										type="password"
										label="New Password"
									/>
									<Input
										value={confirmPassword}
										setValue={setConfirmPassword}
										type="password"
										label="Confirm New Password"
									/>
								</React.Fragment>
							)}

							<Button
								handleSubmit={
									visible ? handleReset : handleSubmit
								}
								type="submit"
								clsName="btn btn-primary"
								email={email}
								password={password}
								btnLabel="Submit"
								loading={loading}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;
