import 'dotenv/config';
import app from './app';

(async () => {
	app.setup();
	await app.preRun();
	app.setupRoutes();
	await app.run();
})();
