import mongoose from 'mongoose';

import User from '../models/user';
import { User as UserType } from '../types/user';

const findUserById = async (id: mongoose.Types.ObjectId): Promise<UserType> => {
	const user: UserType = await User.findById(id);


	return user;
};

export { findUserById };