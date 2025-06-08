import PasswordHashService from './interface';

class NoHash implements PasswordHashService {
	async hash(password: string): Promise<string> {
		return password;
	}

	async compare(password: string, hash: string): Promise<boolean> {
		return password === hash;
	}
}

export default NoHash;
