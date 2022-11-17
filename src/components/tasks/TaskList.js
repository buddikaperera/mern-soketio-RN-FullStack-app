import React, { useContext } from 'react';
import { TaskContext } from '../../context/task';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//dayjs.extend(require('dayjs/plugin/relativeTime'));
dayjs.extend(relativeTime);
const TaskList = () => {
	const [task, setTask] = useContext(TaskContext);

	const handleClicked = (item) => {
		console.log('handleClicked ---> ID' + JSON.stringify(item));
		setTask({ ...task, selected: item });
	};

	return (
		<div className="container mt-2">
			<div class="row">
				<div class="col-md-6 offset-md-3">
					{task?.tasks?.map((task) => (
						<div
							key={task._id}
							className="bg-light rounded shadow p-2 m-2 taskList"
							onClick={() => handleClicked(task)}
						>
							<p>{task.task}</p>
							<p
								className="float-end"
								style={{ fontSize: '11px', marginTop: '-14px' }}
							>
								{dayjs(task.createdAt).fromNow()}
							</p>
						</div>
					))}
				</div>
			</div>
			<pre>{JSON.stringify(task.selected, null, 4)}</pre>
		</div>
	);
};

export default TaskList;
