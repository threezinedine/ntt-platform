import express from 'express';
import { MODE, PORT } from './config';
import logger from 'morgan';
import * as v1Routes from './v1';
import { createDatabaseService } from './services/database';
import ServiceContainer from './services';
import { BcryptHash } from './services/passwordHash';
import { TokenGen } from './services/tokenGen';
import Context from './context';

class Application {
	public app: express.Application;
	private serviceContainer: ServiceContainer;
	private context: Context;

	constructor() {
		this.app = express();
		this.setup();
		this.preRun();
		this.setupRoutes();
	}

	setup() {
		this.app.use(logger('dev'));
		this.app.use(express.json());
	}

	setupRoutes() {
		this.app.get('/ping', (req, res) => {
			res.send('Hello World!');
		});

		v1Routes.router.setServiceContainer(this.serviceContainer);
		v1Routes.router.setContext(this.context);
		this.app.use('/api/v1', v1Routes.router.router);
	}

	async run() {
		this.app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});

		await this.postRun();
		console.log('Server is down');
	}

	async preRun() {
		this.serviceContainer = {
			database: createDatabaseService(),
			passwordHash: new BcryptHash(),
			tokenGen: new TokenGen(),
		};

		this.context = {
			user: null,
			isAuthenticated: false,
		};

		try {
			await this.serviceContainer.database.connect();
		} catch (error) {
			console.error('Failed to connect to database', error);
			process.exit(1);
		}

		if (MODE === 'development') {
			// down the database service and up again
			await this.serviceContainer.database.down();
			await this.serviceContainer.database.up();
		}
	}

	async postRun() {
		await this.serviceContainer.database.disconnect();
	}
}

const app = new Application();

export default app;
