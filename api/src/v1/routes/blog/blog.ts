export default interface Blog {
	id: string;
	authorId: string;
	title: string;
	description: string;
	content: string;
	createdAt: Date;
	updatedAt: Date;
}
