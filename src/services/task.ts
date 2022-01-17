import Task from '../models/task';
import { task } from '../types/task';

export const createTask = async (title: string, description: string | undefined, email: string): Promise<string> => {
	const task = await Task.create({ title, description, completed: false, createdBy: email });

	return task.id;
};

export const getTasks = async (email: string): Promise<task[]> => {
	const tasks = await Task.find({ email });

	const mappedTasks = tasks.map(task => {
		return {
			id: task.id,
			title: task.title,
			description: task.description,
			completed: task.completed,
			createdBy: task.createdBy,
			createdAt: task.createdAt
		};
	});

	return mappedTasks;
};

export const deleteTask = async (email: string, taskId: string): Promise<boolean> => {
	const { createdBy } = await Task.findById(taskId);

	if (createdBy !== email) {
		console.log('Task does not exist');
		return false;
	}

	await Task.deleteOne({ _id: taskId });
	return true;
};

export const editTask = async (email: string, task: task): Promise<boolean> => {
	const taskToBeEdited = await Task.find({ _id: task.id, email: email });

	if (!taskToBeEdited) {
		console.log('Task does not exist');
		return false;
	}

	await Task.updateOne(
		{
			_id: task.id
		},
		{
			title: task.title,
			description: task.description,
			completed: task.completed,
			completedAt: task.completed && task.completedAt
		}
	);

	return true;
};

export const completeTask = async (email: string, taskId: string): Promise<boolean> => {
	return await editTask(email, { id: taskId, completed: true, completedAt: new Date(Date.now()) } as task);
};