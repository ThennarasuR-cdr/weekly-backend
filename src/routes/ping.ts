import express from 'express';

const router = express.Router();

router.get('/', (_, res): void => {
	res.send({ status: 200, message: 'Ping' });
});

export default router;