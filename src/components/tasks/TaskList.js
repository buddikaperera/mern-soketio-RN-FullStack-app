import React, { useContext } from 'react';
import { TaskContext } from '../../context/task';
import { AuthContext } from '../../context/auth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//dayjs.extend(require('dayjs/plugin/relativeTime'));
dayjs.extend(relativeTime);
const TaskList = () => {
	const [task, setTask] = useContext(TaskContext);
	const [auth, setAuth] = useContext(AuthContext);

	const handleClicked = (item) => {
		console.log('handleClicked ---> ID' + JSON.stringify(item));
		setTask({ ...task, selected: item });
	};

	return (
		<div className="container mt-2">
			<div class="row">
				<div class="col-md-6 offset-md-3">
					<p
						className="text-text-muted text-center"
						style={{
							textDecoration: 'underline gold',
							textDecorationThickness: '4px',
						}}
					>
						{task?.tasks.length} tasks
					</p>
					{task?.tasks?.map((task) => (
						<div
							key={task._id}
							style={{
								backgroundColor:
									auth?.user?._id === task?.postedBy?._id
										? '#fce5ba'
										: '#a76846',
							}}
							className="rounded shadow p-2 m-2 taskList"
							onClick={() => handleClicked(task)}
						>
							<p>{task.task}</p>

							<p
								className="float-end"
								style={{ fontSize: '11px', marginTop: '-14px' }}
							>
								{dayjs(task.createdAt).fromNow()} by{' '}
								<b>{task?.postedBy?.name}</b>
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TaskList;
