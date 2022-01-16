import mongoose from 'mongoose';

import User from '../models/user';
import { findUserByEmail, findUserById, registerUser } from './user';

const findByIdSpy = jest.spyOn(User, 'findById');
const findOneSpy = jest.spyOn(User, 'findOne');
const createUserSpy = jest.spyOn(User, 'create');

describe('User service', () => {
	describe('find User by id', () => {
		const expectedUser = { email: 'username@mail.com', password: 'password' };
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
		const expectedUser = { email, password: 'password' };
		findOneSpy.mockResolvedValue(expectedUser);

		it('should find the user by email', async () => {
			const actualUser = await findUserByEmail(email);

			expect(actualUser).toStrictEqual(expectedUser);
			expect(User.findOne).toBeCalledWith({ email });
		});
	});

	describe('register user', () => {
		const expectedUser = { email: 'username@mail.com', password: 'password' };

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		createUserSpy.mockResolvedValue(expectedUser);

		it('should register the user successfully', async () => {
			const email = await registerUser(expectedUser.email, expectedUser.password);

			expect(email).toStrictEqual(expectedUser.email);
			expect(User.create).toBeCalledWith(expectedUser);
		});
	});

});
