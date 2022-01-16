import request from 'supertest';
import app from '../app';
import * as taskService from '../services/task';

const createTaskSpy = jest.spyOn(taskService, 'createTask');
const getTasksSpy = jest.spyOn(taskService, 'getTasks');
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
});
