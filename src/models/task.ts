import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
	title: String,
	description: String || undefined,
	completed: Boolean,
	completedAt: Date || undefined,
	createdBy: String,
}, { timestamps: { createdAt: 'createdAt' } });

const Task = mongoose.model('Tasks', TaskSchema);

export default Task;