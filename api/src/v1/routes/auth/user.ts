export type User = {
	id: string;
	username: string;
	password: string;
	role: 'admin' | 'user';
	createdAt: Date;
	updatedAt: Date;
};
