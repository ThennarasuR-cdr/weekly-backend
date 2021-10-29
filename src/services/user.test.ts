import mongoose from 'mongoose';

import User from '../models/user';
import { findUserByEmail, findUserById } from './user';

describe('User service', () => {
	const findByIdSpy = jest.spyOn(User, 'findById');
	const findOneSpy = jest.spyOn(User, 'findOne');

	describe('find User by id', () => {
		const expectedUser = { id: 'name', email: 'username@mail.com', password: 'password' };
		findByIdSpy.mockResolvedValue(expectedUser);

		it('should find the user by id', async () => {
			const userId = new mongoose.Types.ObjectId('5d6ede6a0ba62570afcedd3a');

			const actualUser = await findUserById(userId);

			expect(actualUser).toBe(expectedUser);
			expect(User.findById).toBeCalledWith(userId);
		});
	});

	describe('find User by email', () => {
		const email = 'username@mail.com';
		const expectedUser = { id: 'name', email, password: 'password' };
		findOneSpy.mockResolvedValue(expectedUser);

		it('should find the user by email', async () => {
			const actualUser = await findUserByEmail(email);

			expect(actualUser).toStrictEqual(expectedUser);
			expect(User.findOne).toBeCalledWith({ email });
		});
	});
});
