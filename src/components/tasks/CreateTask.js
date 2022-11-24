import React, { useContext, useState } from 'react';
import axios from 'axios';

import { TaskContext } from '../../context/task';
//import io from 'socket.io-client';
import socket from '../../socket';

function CreateTask() {
	//const socket = io(
	//	process.env.REACT_APP_SOCKET,
	//{
	//path: '/socket.io',
	//},
	//{ reconnection: true }
	//);

	console.log(`"Sockect clent`, socket);
	const [content, setContent] = useState('');

	const [task, setTask] = useContext(TaskContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.post('/task', { content });
			console.log('data>>>>', data);
			setTask({ ...task, tasks: [data, ...task.tasks] });
			setContent('');
			//emit socket event
			socket.emit('new-task', data);
		} catch (error) {
			console.log('error', error);
		}
	};

	return (
		<React.Fragment>
			<div class="container">
				<div class="row">
					<div class="col-md-6 offset-md-3">
						<form
							className="d-flex justify-content"
							onSubmit={handleSubmit}
						>
							<textarea
								maxLength="160"
								className="form-control m-1"
								value={content}
								placeholder="write some text"
								onChange={(e) => setContent(e.target.value)}
							/>

							<button
								type="submit"
								className="btn btn-warning  m-1"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default CreateTask;
