import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { removeFromLocalStorage } from '../../helpers/auth';

function Main() {
	const [auth, setAuth] = useContext(AuthContext);

	const logOut = () => {
		setAuth(null);
		removeFromLocalStorage();
	};

	return (
		<ul className="nav shadow mb-2 d-flex justify-content-center">
			<li className="nav-item">
				<NavLink className="nav-link" to="/">
					Home
				</NavLink>
			</li>

			{auth !== null && auth !== undefined ? (
				<React.Fragment>
					<li>
						<a
							className="nav-link dropdown-toggle"
							data-bs-toggle="dropdown"
						>
							{auth?.user?.name}
						</a>
						<ul className="dropdown-menu">
							<li>
								<NavLink
									className="nav-link"
									to="/login"
									onClick={logOut}
								>
									Logout
								</NavLink>
							</li>
						</ul>
					</li>
				</React.Fragment>
			) : (
				<React.Fragment>
					<li className="nav-item">
						<NavLink className="nav-link" to="/register">
							Register
						</NavLink>
					</li>

					<li className="nav-item">
						<NavLink className="nav-link" to="/login">
							Login
						</NavLink>
					</li>
				</React.Fragment>
			)}
		</ul>
	);
}

export default Main;
