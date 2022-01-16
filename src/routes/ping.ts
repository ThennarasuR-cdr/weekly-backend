import express from 'express';

const router = express.Router();

router.get('/', (_, res): void => {
	res.status(200).send({ message: 'Ping' });
});

export default router;