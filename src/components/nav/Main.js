import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Main() {
	return (
		<ul className="nav shadow mb-2 d-flex justify-content-center">
			<li className="nav-item">
				<NavLink className="nav-link" to="/">
					Home
				</NavLink>
			</li>

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
		</ul>
	);
}

export default Main;
