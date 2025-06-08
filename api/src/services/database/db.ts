import { User } from '../../v1/routes/auth/user';

export default interface DatabaseService {
	connect(): Promise<void>;
	disconnect(): Promise<void>;

	// configuring
	up(): Promise<void>;
	down(): Promise<void>;

	// users
	createNewUser(user: User): Promise<void>;
	getUserByUsername(username: string): Promise<User>;
	getUserById(id: string): Promise<User>;
}
