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