import request from 'supertest';
import app from '../app';
import * as userService from '../services/user';
import { User } from '../types/user';

jest.mock('../services/token', () => ({
	issueToken: jest.fn().mockReturnValue('validUser-123')
}));

describe('Login', () => {
	it('should login successfully for valid user', async () => {
		jest.spyOn(userService, 'findUserByEmail')
			.mockResolvedValue({ email: 'validUser', password: '123' } as User);

		const response = await request(app)
			.post('/login')
			.send({ email: 'validUser', password: '123' });

		expect(response.status).toBe(200);
		expect(response.body).toStrictEqual({ message: 'Success', data: { token: 'validUser-123' } });
	});

	it('should not login successfully for invalid user', async () => {
		jest.spyOn(userService, 'findUserByEmail')
			.mockResolvedValue({ password: '123434' } as User);

		const response = await request(app)
			.post('/login')
			.send({ email: 'invalidUser', password: '123' });

		expect(response.status).toBe(401);
		expect(response.body).toStrictEqual({ message: 'Failure' });
	});

});
