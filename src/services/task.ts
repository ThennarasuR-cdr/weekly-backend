import Task from '../models/task';

export const createTask = async (title: string, description: string | undefined, email: string): Promise<string> => {
	const task = await Task.create({ title, description, completed: false, createdBy: email });

	return task.id;
};