import React, { useContext, useState } from 'react';
import axios from 'axios';
import { TaskContext } from '../../context/task';

function CreateTask() {
	const [content, setContent] = useState('');

	const [task, setTask] = useContext(TaskContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post('/task', { content });
			console.log('data>>>>', data);
			setTask({ ...task, tasks: [data, ...task.tasks] });
			setContent('');
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<React.Fragment>
			<form
				className="d-flex justify-content-center"
				onSubmit={handleSubmit}
			>
				<textarea
					maxLength="160"
					className="form-control m-1"
					value={content}
					placeholder="write some text"
					onChange={(e) => setContent(e.target.value)}
				/>

				<button type="submit" className="btn btn-primary  m-1">
					Submit
				</button>
			</form>
		</React.Fragment>
	);
}

export default CreateTask;
