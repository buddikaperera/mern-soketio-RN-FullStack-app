import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'antd';
import { TaskContext } from '../../context/task';
import { AuthContext } from '../../context/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';

///https://rapidgator.net/file/98a7d4fbe0be4fa71df3654f62453aff/klD6Dc3P__WhatsappCl_.part2.rar.html
///https://rapidgator.net/file/d3614c1f4e40eed143f8aae834ee5062/klD6Dc3P__WhatsappCl_.part1.rar.html

function UpdateTask() {
	const [task, setTask] = useContext(TaskContext);
	const [auth, setAuth] = useContext(AuthContext);
	const [content, setContent] = useState('');

	useEffect(() => {
		if (task) {
			setContent(task?.selected?.task);
		}
	}, [task]);

	const handleUpdate = async (e) => {
		e.preventDefault();

		console.log('handleUpdate', task?.selected?._id);

		let taskId = task?.selected?._id;

		try {
			const { data } = await axios.put(`/task/${taskId}`, {
				task: content,
			});
			console.log('data>>>>', data);

			const newList = task.tasks.map((t) => {
				if (t._id === data._id) {
					return data;
				}
				return t;
			});
			setTask((prev) => ({ ...prev, tasks: newList, selected: null }));
			//setTask({ ...task, tasks: newList, selected: null });
			toast.success('Task Updated..!');
		} catch (error) {
			console.log('error', error);
		}
	};

	const handleDelete = async (e) => {
		e.preventDefault();
		console.log('handleDelete', task?.selected?._id);

		let taskId = task?.selected?._id;

		try {
			const { data } = await axios.delete(`/task/${taskId}`);
			console.log('data>>>>', data);

			setTask((prev) => ({
				...prev,
				tasks: prev.tasks.filter((task) => task._id !== data._id),
				selected: null,
			}));
			toast.success('Task Deleted..!');
		} catch (error) {
			console.log('error', error);
		}
	};
	//console.log('auth?.user?._id ', auth?.user?._id);
	//console.log('task.selected ', task?.selected.postedBy?._id);
	const updatedStatus = auth?.user?._id === task?.selected?.postedBy?._id;

	console.log(updatedStatus, updatedStatus);

	return (
		<div>
			<Modal
				title="Update Task"
				centered
				open={task?.selected !== null ? true : false}
				footer={null}
				onCancel={() => setTask({ ...task, selected: null })}
				onOk={() => setTask({ ...task, selected: null })}
			>
				<form
					className="d-flex justify-content-center"
					onSubmit={handleUpdate}
				>
					<textarea
						maxLength="160"
						className="form-control m-1"
						value={content}
						placeholder="write some text"
						onChange={(e) => setContent(e.target.value)}
					/>
					{updatedStatus ? (
						<React.Fragment>
							<button
								type="submit"
								className="btn btn-primary  m-1"
							>
								Update
							</button>

							<button
								type="submit"
								onClick={handleDelete}
								className="btn btn-danger  m-1"
							>
								Delete
							</button>
						</React.Fragment>
					) : (
						<button type="submit" className="btn  disabled  m-1">
							by {task?.selected?.postedBy?.name}
						</button>
					)}
				</form>
			</Modal>
		</div>
	);
}

export default UpdateTask;
