import request from 'supertest';
import app from '../app';
import * as userService from '../services/user';

const createUserSpy = jest.spyOn(userService, 'registerUser');
const findUserSpy = jest.spyOn(userService, 'findUserByEmail');

describe('Registration', () => {
	it('should register the user', async () => {
		createUserSpy.mockResolvedValue('test@mail.com');
		findUserSpy.mockResolvedValue(null);

		const res = await request(app)
			.post('/register')
			.send({ email: 'test@mail.com', password: 'testPassword' });

		expect(res.status).toBe(200);
		expect(res.body).toStrictEqual({ message: 'Registration Successful', data: { email: 'test@mail.com' } });
	});

	it('should return conflict when user already exist in db', async () => {
		createUserSpy.mockResolvedValue('test@mail.com');
		findUserSpy.mockResolvedValue({ email: 'test@mail.com', password: 'pass' });

		const res = await request(app)
			.post('/register')
			.send({ email: 'test@mail.com', password: 'testPassword' });

		expect(res.status).toBe(409);
		expect(res.body).toStrictEqual({ message: 'User Already exists' });
	});
});
