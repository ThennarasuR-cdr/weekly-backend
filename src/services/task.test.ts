import Task from '../models/task';
import * as taskService from './task';

const createTaskSpy = jest.spyOn(Task, 'create');
const findTaskSpy = jest.spyOn(Task, 'find');
const findByIdTaskSpy = jest.spyOn(Task, 'findById');
const deleteTaskSpy = jest.spyOn(Task, 'deleteOne');
const updateTaskSpy = jest.spyOn(Task, 'updateOne');

describe('Task service', () => {
	jest.spyOn(Date, 'now').mockReturnValue(1111);
	describe('create task', () => {
		it('should create a task', async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			createTaskSpy.mockResolvedValue({ id: 1 });

			const taskId = await taskService.createTask('Study Networks', undefined, 'email');

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

			const actualTask = await taskService.getTasks('email');

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

			const result = await taskService.deleteTask('email', 'taskId');

			expect(deleteTaskSpy).toHaveBeenCalledWith({ _id: 'taskId' });
			expect(result).toBeTruthy();
		});

		it('should not delete the task of the another user', async () => {
			findByIdTaskSpy.mockResolvedValue({ createdBy: 'email1' });

			const result = await taskService.deleteTask('email', 'taskId');

			expect(deleteTaskSpy).not.toHaveBeenCalled();
			expect(result).toBeFalsy();
		});
	});

	describe('Edit task', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		const task = {
			title: 'title',
			description: 'desc',
			completed: undefined,
			createdAt: undefined,
			createdBy: undefined,
			id: 'id'
		};
		it('should edit the existing task while completion', async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			findTaskSpy.mockResolvedValue(task);
			updateTaskSpy.mockResolvedValue({ matchedCount: 1, modifiedCount: 1 } as any);

			const result = await taskService.editTask('mail', { ...task, title: 'new title', completed: true, completedAt: new Date(Date.now()) });

			expect(updateTaskSpy).toHaveBeenCalledWith({ _id: 'id' },
				{
					title: 'new title', description: 'desc',
					completed: true,
					completedAt: new Date('1970-01-01T00:00:01.111Z')
				});
			expect(result).toBeTruthy();
		});

		it('should edit the existing task while incompletion', async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			findTaskSpy.mockResolvedValue(task);
			updateTaskSpy.mockResolvedValue({ matchedCount: 1, modifiedCount: 1 } as any);

			const result = await taskService.editTask('mail', { ...task, title: 'new title', completed: false });

			expect(updateTaskSpy).toHaveBeenCalledWith({ _id: 'id' },
				{
					title: 'new title', description: 'desc',
					completed: false,
					completedAt: null
				});
			expect(result).toBeTruthy();
		});

		it('should not edit the task of other users', async () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			findTaskSpy.mockResolvedValue(null);

			const result = await taskService.editTask('mail', { ...task, title: 'new title' });

			expect(updateTaskSpy).not.toHaveBeenCalled();
			expect(result).toBeFalsy();
		});
	});

	describe('Complete task', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should complete the task', async () => {
			const editTaskSpy = jest.spyOn(taskService, 'editTask').mockResolvedValue(true);

			const result = await taskService.completeTask('email', '121');

			expect(result).toBeTruthy();
			expect(editTaskSpy).toBeCalledWith('email', { id: '121', completed: true, completedAt: new Date('1970-01-01T00:00:01.111Z') });
		});
	});

	describe('set task to incomplete', () => {
		beforeEach(() => {
			jest.clearAllMocks();
		});

		it('should set the task to incomplete', async () => {
			const editTaskSpy = jest.spyOn(taskService, 'editTask').mockResolvedValue(true);

			const result = await taskService.setTaskToIncomplete('email', '121');

			expect(result).toBeTruthy();
			expect(editTaskSpy).toBeCalledWith('email', { id: '121', completed: false, completedAt: null });
		});
	});
});
