export interface task {
	id: string,
	title: string,
	description?: string,
	createdAt: Date,
	completed: boolean,
	completedAt?: Date,
	createdBy: string
}