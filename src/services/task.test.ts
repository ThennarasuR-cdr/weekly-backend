import Task from '../models/task';
import { createTask } from './task';

const createTaskSpy = jest.spyOn(Task, 'create');

describe('Task service', () => {
	describe('create task', () => {
		it('should create a task', async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			createTaskSpy.mockResolvedValue({ id: 1 });

			const taskId = await createTask('Study Networks', undefined, 'email');

			expect(taskId).toBe(1);
			expect(createTaskSpy).toHaveBeenCalledWith({ title: 'Study Networks', description: undefined, createdBy: 'email', completed: false });
		});
	});
});
