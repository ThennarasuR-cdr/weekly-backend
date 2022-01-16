import express from 'express';
import validate from '../middleware/validator';
import { createTask, getTasks } from '../services/task';

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

router.get('/task', async (req, res) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const email = req.user.email;

	const tasks = await getTasks(email);

	res.status(200).send({ message: 'Tasks fetched successfully', data: { tasks } });
	return;
});

export default router;