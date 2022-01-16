import express from 'express';
import validate from '../middleware/validator';
import { findUserByEmail, registerUser } from '../services/user';

const router = express.Router();

router.post('/register', validate({ required: ['email', 'password'] }), async (req, res) => {
	const { email, password } = req.body;

	const user = await findUserByEmail(email);
	if (user) {
		res.status(409).send({ message: 'User Already exists' });
		return;
	}
	const registeredEmail = await registerUser(email, password);

	res.status(200).send({ message: 'Registration Successful', data: { email: registeredEmail } });
	return;
});

export default router;