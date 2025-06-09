export default interface Comment {
	id: string;
	blogId: string;
	userId: string | null;
	parentId: string | null;
	content: string;
	createdAt: Date;
	updatedAt: Date;
	likedUserIds: string[];
	dislikedUserIds: string[];
}
