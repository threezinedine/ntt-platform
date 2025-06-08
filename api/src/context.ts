import { User } from './v1/routes/auth/user';

export default interface Context {
	user: User | null;
	isAuthenticated: boolean;
}
