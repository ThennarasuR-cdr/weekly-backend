import express from 'express';
import validate from '../middleware/validator';
import { createTask } from '../services/task';

const router = express.Router();

router.post('/task', validate({ required: ['title'] }), async (req, res) => {
	const { title, description } = req.body;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const email = req.user.email;

	const taskId = await createTask(title, description, email);

	res.status(200).send({ message: 'Task created successfully', data: { taskId } });
	return;
});

export default router;