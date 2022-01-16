import Task from '../models/task';
import { createTask, getTasks } from './task';

const createTaskSpy = jest.spyOn(Task, 'create');
const findTaskSpy = jest.spyOn(Task, 'find');

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

	describe('get task', () => {
		const expectedTask = [{
			title: 'title',
			description: 'desc',
			completed: undefined,
			createdAt: undefined,
			createdBy: undefined,
			id: undefined,
		}];

		it('should get the task', async () => {
			findTaskSpy.mockResolvedValue(expectedTask);

			const actualTask = await getTasks('email');

			expect(actualTask).toStrictEqual(expectedTask);
			expect(findTaskSpy).toHaveBeenCalledWith({ email: 'email' });
		});
	});
});
