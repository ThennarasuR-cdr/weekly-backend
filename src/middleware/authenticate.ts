import { verifyToken } from '../services/token';

const authenticate = (req, res, next) => {
	const token = req.headers.authorization.replace('Bearer ', '');

	const email = verifyToken(token);

	if (email) {
		req.user = { email };

		next();
		return;
	}

	res.status(401).send({ message: 'Invalid Token' });
	return;
};

export default authenticate;