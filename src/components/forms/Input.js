import React from 'react';

const Input = ({ value, setValue, type, label }) => {
	return (
		<div className="mb-3">
			<label className="form-label">{label}</label>
			<input
				type={type}
				className="form-control"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export default Input;
