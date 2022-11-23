import React, { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/task';
import { AuthContext } from '../../context/auth';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

import useSearch from '../../hooks/useSearch';

//dayjs.extend(require('dayjs/plugin/relativeTime'));
dayjs.extend(relativeTime);
const TaskList = () => {
	const [task, setTask] = useContext(TaskContext);
	const [auth, setAuth] = useContext(AuthContext);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	//const [keyword, setKeyword] = useState('');

	//const filterTask = task?.tasks?.filter((t) =>
	//t.task.toLowerCase().includes(keyword)
	//);
	///custom hook

	const { keyword, setKeyword, filterTask } = useSearch();

	const getTotal = async () => {
		try {
			const { data } = await axios.get('/task-count');
			setTotal(data);
			console.log('TOTAL--->', total);
		} catch (error) {
			console.log('ERROR--->', error);
		}
	};

	useEffect(() => {
		getTotal();
	}, []);

	const loadTasks = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`/tasks/${page}`);
			//setTask({ ...task, tasks: data });
			setTask((prev) => ({ ...prev, tasks: [...prev.tasks, ...data] }));
			setLoading(false);
		} catch (error) {
			console.log('ERROR--->', error);
			setLoading(false);
		}
	};

	useEffect(() => {
		if (page == 1) return;

		loadTasks();
	}, [page]);

	const handleClicked = (item) => {
		console.log('handleClicked ---> ID' + JSON.stringify(item));
		setTask({ ...task, selected: item });
	};

	return (
		<div className="container mt-2">
			<div class="row">
				<div class="col-md-6 offset-md-3">
					<div class="m-2">
						<input
							type="search"
							className="form-control"
							placeholder="Search task"
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
						/>
					</div>
					<p
						className="text-text-muted text-center"
						style={{
							textDecoration: 'underline gold',
							textDecorationThickness: '4px',
						}}
					>
						{task?.tasks.length} tasks
					</p>
					{filterTask?.map((task) => (
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
					{task?.tasks?.length < total && (
						<div className="text-center mt-4 mb-4">
							<button
								className="btn btn-outline-warning "
								disabled={loading}
								onClick={(e) => {
									e.preventDefault();
									setPage(page + 1);
								}}
							>
								Load more..
							</button>{' '}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TaskList;
