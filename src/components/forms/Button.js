import React from 'react';
import LoadingGif from '../../images/spinner.gif';

const Button = ({
	handleSubmit,
	type,
	clsName,
	name = '',
	email,
	password,
	btnLabel,
	loading,
}) => {
	return (
		<div>
			<button
				onClick={handleSubmit}
				type={type}
				className={clsName}
				disabled={(name && !name) || !email || (password && !password)}
			>
				{btnLabel}
				{loading ? (
					<img
						src={LoadingGif}
						style={{ height: '23px' }}
						alt="loading..!"
					/>
				) : (
					''
				)}
			</button>
		</div>
	);
};

export default Button;
