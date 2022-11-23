import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { TaskContext } from '../context/task';
import CreateTask from '../components/tasks/CreateTask';
import TaskList from '../components/tasks/TaskList';
import UpdateTask from '../components/tasks/UpdateTask';

function Tasks() {
	const [task, setTask] = useContext(TaskContext);

	useEffect(() => {
		getAllTasks();
	}, []);

	const getAllTasks = async () => {
		try {
			const { data } = await axios.get('/tasks/1');
			console.log('data>>>>', data);
			setTask({ ...task, tasks: data });
		} catch (error) {
			console.log('error', error);
		}
	};
	return (
		<React.Fragment>
			<CreateTask />
			<UpdateTask />
			<TaskList />
		</React.Fragment>
	);
}

export default Tasks;
