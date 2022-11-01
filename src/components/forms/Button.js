import React from 'react';

const Button = ({ handleSubmit, type, clsName, email, password, btnLabel }) => {
	return (
		<div>
			<button
				onClick={handleSubmit}
				type={type}
				className={clsName}
				disabled={!email || !password}
			>
				{btnLabel}
			</button>
		</div>
	);
};

export default Button;
