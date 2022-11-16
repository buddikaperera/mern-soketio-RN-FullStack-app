import { createContext, useState } from 'react';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
	const [task, setTask] = useState({ tasks: [], selecte: {} });

	return (
		<TaskContext.Provider value={[task, setTask]}>
			{children}
		</TaskContext.Provider>
	);
};

export { TaskContext, TaskProvider };
