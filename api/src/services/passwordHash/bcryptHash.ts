import PasswordHashService from './interface';
import bcrypt from 'bcrypt';

class BcryptHash implements PasswordHashService {
	async hash(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	async compare(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}

export default BcryptHash;
