import request from 'supertest';
import app from '../app';
import * as taskService from '../services/task';

const createTaskSpy = jest.spyOn(taskService, 'createTask');
const getTasksSpy = jest.spyOn(taskService, 'getTasks');
const deleteTaskSpy = jest.spyOn(taskService, 'deleteTask');
const editTaskSpy = jest.spyOn(taskService, 'editTask');
const completeTaskSpy = jest.spyOn(taskService, 'completeTask');

jest.mock('../middleware/authenticate', () => (req, res, next) => {
	req.user = { email: 'email' };
	next();
	return;
});

describe('Task router', () => {
	describe('create task', () => {
		it('should create task', async () => {
			createTaskSpy.mockResolvedValue('taskId');

			const response = await request(app).post('/task').send({ title: 'title', description: 'description' });

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({ message: 'Task created successfully', data: { taskId: 'taskId' } });
		});
	});

	describe('get Tasks', () => {
		const expectedTasks = [{ id: 'id', title: 'title', completed: false, createdAt: new Date('1970-01-01'), createdBy: 'email' }];
		it('should get the tasks', async () => {
			const expectedResponseBody = { message: 'Tasks fetched successfully', data: { tasks: [{ ...expectedTasks[0], createdAt: '1970-01-01T00:00:00.000Z' }] } };
			getTasksSpy.mockResolvedValue(expectedTasks);

			const response = await request(app).get('/task');

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual(expectedResponseBody);
		});
	});

	describe('delete task', () => {
		it('should delete the task', async () => {
			deleteTaskSpy.mockResolvedValue(true);

			const response = await request(app).delete('/task').send({ taskId: 'taskId' });

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({ message: 'Task deleted successfully' });
		});

		it('should return 404 when the task is not found', async () => {
			deleteTaskSpy.mockResolvedValue(false);

			const response = await request(app).delete('/task').send({ taskId: 'taskId' });

			expect(response.status).toBe(404);
			expect(response.body).toStrictEqual({ message: 'Task not found' });
		});
	});

	describe('edit task', () => {
		it('should edit the task', async () => {
			editTaskSpy.mockResolvedValue(true);

			const response = await request(app).post('/task/edit').send({ id: 'taskId' });

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({ message: 'Task edited successfully', data: { taskId: 'taskId' } });
		});

		it('should return 404 when the task is not found', async () => {
			editTaskSpy.mockResolvedValue(false);

			const response = await request(app).post('/task/edit').send({ id: 'taskId' });

			expect(response.status).toBe(404);
			expect(response.body).toStrictEqual({ message: 'Task does not exist' });
		});
	});

	describe('complete task', () => {
		it('should complete the task', async () => {
			completeTaskSpy.mockResolvedValue(true);

			const response = await request(app).post('/task/complete').send({ taskId: 'taskId' });

			expect(response.status).toBe(200);
			expect(response.body).toStrictEqual({ message: 'Task completed successfully', data: { taskId: 'taskId' } });
		});

		it('should return 404 when the task is not found', async () => {
			completeTaskSpy.mockResolvedValue(false);

			const response = await request(app).post('/task/complete').send({ taskId: 'taskId' });

			expect(response.status).toBe(404);
			expect(response.body).toStrictEqual({ message: 'Task does not exist' });
		});
	});

});
