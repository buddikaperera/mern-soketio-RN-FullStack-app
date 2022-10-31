import React from 'react';

function Register() {
	return (
		<div
			className="d-flex justify-content-center align-items-center vh-100"
			style={{ marginTop: '-100px' }}
		>
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<h1 className="fw-bold mb-3">Register </h1>
						<form>
							<div className="mb-3">
								<label
									htmlFor="exampleInputEmail1"
									className="form-label"
								>
									Email address
								</label>
								<input
									type="email"
									className="form-control"
									id="exampleInputEmail1"
									aria-describedby="emailHelp"
								/>
							</div>
							<div className="mb-3">
								<label
									htmlFor="exampleInputPassword1"
									className="form-label"
								>
									Password
								</label>
								<input
									type="password"
									className="form-control"
									id="exampleInputPassword1"
								/>
							</div>

							<button type="submit" className="btn btn-primary">
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
