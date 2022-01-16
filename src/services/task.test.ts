import Task from '../models/task';
import { createTask, deleteTask, getTasks } from './task';

const createTaskSpy = jest.spyOn(Task, 'create');
const findTaskSpy = jest.spyOn(Task, 'find');
const findByIdTaskSpy = jest.spyOn(Task, 'findById');
const deleteTaskSpy = jest.spyOn(Task, 'deleteOne');

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

	describe('delete task', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should delete the task of the user', async () => {
			deleteTaskSpy.mockResolvedValue({ deletedCount: 1, acknowledged: true });
			findByIdTaskSpy.mockResolvedValue({ createdBy: 'email' });

			const result = await deleteTask('email', 'taskId');

			expect(deleteTaskSpy).toHaveBeenCalledWith({ _id: 'taskId' });
			expect(result).toBeTruthy();
		});

		it('should not delete the task of the another user', async () => {
			findByIdTaskSpy.mockResolvedValue({ createdBy: 'email1' });

			const result = await deleteTask('email', 'taskId');

			expect(deleteTaskSpy).not.toHaveBeenCalled();
			expect(result).toBeFalsy();
		});
	});
});
