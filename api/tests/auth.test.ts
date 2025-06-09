import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import app from '../src/app.ts';
import dotenv from 'dotenv';

describe('Testing Ping Request for the API', () => {
	beforeAll(async () => {
		dotenv.config({ path: '.test.env' });
		app.setup();
		await app.preRun();
		app.setupRoutes();
	});

	afterAll(async () => {
		await app.postRun();
	});

	const user = {
		username: 'test-user',
		password: 'test-password',
	};
	const invalidUserName = 'invalid';
	const invalidPassword = 'invalid';

	let accessToken: string;
	let refreshToken: string;

	it('registering a user', async () => {
		const response = await supertest(app.app)
			.post('/api/v1/auth/register')
			.send({
				username: user.username,
				password: user.password,
			});

		expect(response.status).toBe(201);
	});

	it('should can login in', async () => {
		const response = await supertest(app.app)
			.post('/api/v1/auth/login')
			.send({
				username: user.username,
				password: user.password,
			});

		expect(response.status).toBe(200);
		expect(response.body.accessToken).toBeDefined();
		expect(response.body.refreshToken).toBeDefined();

		accessToken = response.body.accessToken;
		refreshToken = response.body.refreshToken;
	});

	it('should not able to login with invalid username', async () => {
		const response = await supertest(app.app)
			.post('/api/v1/auth/login')
			.send({
				username: invalidUserName,
				password: user.password,
			});

		expect(response.status).toBe(401);
	});

	it('should not able to login with invalid password', async () => {
		const response = await supertest(app.app)
			.post('/api/v1/auth/login')
			.send({
				username: user.username,
				password: invalidPassword,
			});

		expect(response.status).toBe(401);
	});

	it('should can get user data with valid access token', async () => {
		const response = await supertest(app.app)
			.get('/api/v1/auth/user')
			.set('Authorization', `Bearer ${accessToken}`);

		console.log(response.body);

		expect(response.status).toBe(200);
		expect(response.body.userId).toBeDefined();
		expect(response.body.username).toBe(user.username);
		expect(response.body.password).toBeUndefined();
		expect(response.body.role).toBe('user');
	});

	it('should not able to get the user with expired access token', async () => {
		const response = await supertest(app.app)
			.get('/api/v1/auth/user')
			.set('Authorization', `Bearer ${accessToken}-invalid`);

		expect(response.status).toBe(401);
	});

	it('should return a new access token with valid refresh token', async () => {
		const response = await supertest(app.app)
			.post('/api/v1/auth/refresh')
			.send({
				refreshToken: refreshToken,
				accessToken: accessToken,
			});

		expect(response.status).toBe(200);
		expect(response.body.accessToken).toBeDefined();

		const loginResponse = await supertest(app.app)
			.post('/api/v1/auth/login')
			.send({
				username: user.username,
				password: user.password,
			});

		expect(loginResponse.status).toBe(200);
	});

	it('should not refresh token with invalid refresh token', async () => {
		const response = await supertest(app.app)
			.post('/api/v1/auth/refresh')
			.send({
				refreshToken: 'invalid',
				accessToken: accessToken,
			});

		expect(response.status).toBe(401);
	});
});
