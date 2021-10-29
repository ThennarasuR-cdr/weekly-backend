import request from 'supertest';
import app from '../app';

describe('Ping', () => {
	it('Should return pong', async () => {
		const res = await request(app).get('/');

		expect(res.body.status).toBe(200);
		expect(res.body.message).toBe('Ping');
	});
});
