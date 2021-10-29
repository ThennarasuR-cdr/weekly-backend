import mongoose from 'mongoose';

import User from '../models/user';
import { findUserById } from './user';

describe('User service', () => {
	const findUserByIdSpy = jest.spyOn(User, 'findById');

	describe('get User by name', () => {
		const expectedUser = { id: 'name', name: 'userName', password: 'password' };
		findUserByIdSpy.mockResolvedValue(expectedUser);

		it('should get the user by id', async () => {
			const userId = new mongoose.Types.ObjectId('5d6ede6a0ba62570afcedd3a');

			const actualUser = await findUserById(userId);

			expect(actualUser).toBe(expectedUser);
			expect(User.findById).toBeCalledWith(userId);
		});
	});
});
