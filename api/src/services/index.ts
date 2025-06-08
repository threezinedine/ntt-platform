import { DatabaseService } from './database';
import PasswordHashService from './passwordHash';
import { TokenGenService } from './tokenGen';

interface ServiceContainer {
	database: DatabaseService;
	passwordHash: PasswordHashService;
	tokenGen: TokenGenService;
}

export default ServiceContainer;
