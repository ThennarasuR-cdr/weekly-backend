import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.send({ status: 200, message: 'Ping' });
});

export default router;