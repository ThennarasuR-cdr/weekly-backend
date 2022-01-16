import express from 'express';

import { issueToken } from '../services/token';
import { findUserByEmail } from '../services/user';

const router = express.Router();

router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await findUserByEmail(email);
	if (user.password === password) {
		const token = issueToken({ email });

		res.status(200).send({ message: 'Success', data: { token: token } });
		console.log('Authentication success');
		return;
	}

	console.log('Authentication failed: Wrong password');
	res.status(401).send({ message: 'Failure' });
	return;
});

export default router;