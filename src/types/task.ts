export interface task {
	id: string,
	title: string,
	description: string | undefined,
	createdAt: Date,
	completed: boolean,
	completedAt: Date | undefined,
	createdBy: string
}