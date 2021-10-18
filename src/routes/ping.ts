import express from 'express';

const router = express.Router();

router.get('/ping', (req, res, next) => {
    res.send({ status: 200, message: 'Pong' });
});

export default router;