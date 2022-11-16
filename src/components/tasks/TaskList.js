import React, { useContext } from 'react';
import { TaskContext } from '../../context/task';

const TaskList = () => {
	const [task, setTask] = useContext(TaskContext);
	return (
		<div className="container mt-2">
			<div class="row">
				<div class="col-md-6 offset-md-3">
					{task?.tasks?.map((task) => (
						<div key={task._id}>
							<p>{task.task}</p>
							<p>{task.createdAt}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TaskList;
