import React from 'react';

function SearchBar({ keyword, setKeyword }) {
	return (
		<div>
			<div class="m-2">
				<input
					type="search"
					className="form-control"
					placeholder="Search task"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default SearchBar;
