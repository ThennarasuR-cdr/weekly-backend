import express from 'express';
import validate from '../middleware/validator';
import { completeTask, createTask, deleteTask, editTask, getTasks } from '../services/task';
import { task } from '../types/task';

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

router.post('/task/edit', validate({ required: ['id'] }), async (req, res) => {
	const task: task = req.body;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const email = req.user.email;

	const result = await editTask(email, task);

	if (result) {
		res.status(200).send({ message: 'Task edited successfully', data: { taskId: task.id } });
		return;
	}

	res.status(404).send({ message: 'Task does not exist' });
	return;
});

router.post('/task/complete', validate({ required: ['taskId'] }), async (req, res) => {
	const { taskId } = req.body;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const email = req.user.email;

	const result = await completeTask(email, taskId);

	if (result) {
		res.status(200).send({ message: 'Task completed successfully', data: { taskId } });
		return;
	}

	res.status(404).send({ message: 'Task does not exist' });
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

router.delete('/task', validate({ required: ['taskId'] }), async (req, res) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	//@ts-ignore
	const email = req.user.email;
	const { taskId } = req.body;

	const result = await deleteTask(email, taskId);
	if (result) {
		res.status(200).send({ message: 'Task deleted successfully' });
		return;
	} else {
		res.status(404).send({ message: 'Task not found' });
		return;
	}
});

export default router;