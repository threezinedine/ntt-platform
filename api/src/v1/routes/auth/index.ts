import { Request, Response } from 'express';
import { LoginRequest, RegisterRequest } from './requests';
import { LoginResponse, RegisterResponse, UserResponse } from './response';
import WrapRouter from '../../../wrap_router';
import { User } from './user';
import { v4 as uuidv4 } from 'uuid';
import { ErrorResponse } from '@/response';
import { TokenInfo } from '@/services/tokenGen';
import authMiddleware from './auth_middleware';

const router = new WrapRouter();

router.post(
	'/login',
	[],
	async (
		router: WrapRouter,
		req: Request<LoginRequest>,
		res: Response<LoginResponse | ErrorResponse>,
	) => {
		let user: User;
		try {
			user = await router.serviceContainer.database.getUserByUsername(
				req.body.username,
			);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: 'Failed to login',
			} as ErrorResponse);
			return;
		}

		if (!user) {
			res.status(401).send({
				message: 'User not found',
			} as ErrorResponse);
			return;
		}

		const isPasswordValid =
			await router.serviceContainer.passwordHash.compare(
				req.body.password,
				user.password,
			);

		if (!isPasswordValid) {
			res.status(401).send({
				message: 'Invalid password',
			} as ErrorResponse);
			return;
		}

		const accessToken =
			await router.serviceContainer.tokenGen.generateAccessToken({
				userId: user.id,
				username: user.username,
				role: user.role,
			});

		const refreshToken =
			await router.serviceContainer.tokenGen.generateRefreshToken({
				userId: user.id,
				username: user.username,
				role: user.role,
			});

		res.send({
			accessToken,
			refreshToken,
		});
	},
);

router.post(
	'/register',
	[],
	async (
		router: WrapRouter,
		req: Request<RegisterRequest>,
		res: Response<RegisterResponse>,
	) => {
		const user: User = {
			id: uuidv4(),
			username: req.body.username,
			password: await router.serviceContainer.passwordHash.hash(
				req.body.password,
			),
			role: 'user',
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		try {
			await router.serviceContainer.database.createNewUser(user);
			res.status(201).send();
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: 'Failed to create user',
			} as ErrorResponse);
		}
	},
);

router.get(
	'/user',
	[authMiddleware(router, ['user'], false)],
	async (router: WrapRouter, req: Request, res: Response) => {
		res.send({
			userId: router.context.user?.id,
			username: router.context.user?.username,
			role: router.context.user?.role,
		} as UserResponse);
	},
);

export { router };
