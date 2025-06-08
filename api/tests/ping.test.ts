import supertest from 'supertest';
import app from '../src/app.ts';

describe('Testing Ping Request for the API', () => {
	it('should return 200', async () => {
		const response = await supertest(app.app).get('/ping');

		expect(response.status).toBe(200);
	});
});
