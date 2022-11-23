import { useContext, useState } from 'react';
import { TaskContext } from '../context/task';

export default function useSearch() {
	const [task, setTask] = useContext(TaskContext);

	const [keyword, setKeyword] = useState('');

	const filterTask = task?.tasks?.filter((t) =>
		t.task.toLowerCase().includes(keyword)
	);

	return { keyword, setKeyword, filterTask };
}
