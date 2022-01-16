import request from 'supertest';
import app from '../app';
import * as taskService from '../services/task';

const createTaskSpy = jest.spyOn(taskService, 'createTask');
jest.mock('../middleware/authenticate', () => (req, res, next) => {
	req.user = { email: 'email' };
	next();
	return;
});

describe('Task router', () => {
	it('should create task', async () => {
		createTaskSpy.mockResolvedValue('taskId');

		const response = await request(app).post('/task').send({ title: 'title', description: 'description' });

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({ message: 'Task created successfully', data: { taskId: 'taskId' } });
	});
});
