import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
	id: String,
	name: String,
	password: String
});

const User = mongoose.model('Users', UserSchema);

export default User;