import { Request, Response, NextFunction } from 'express';
import Context from '../../../context';
import ServiceContainer from '../../../services';
import WrapRouter from '../../../wrap_router';
import { ErrorResponse } from '@/services/response';
import { TokenInfo } from '@/services/tokenGen';
import { Middleware } from '../../../middleware';

export default function authMiddleware(
	router: WrapRouter,
	roles: string[],
	allowUnauthenticated: boolean = false,
): Middleware {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		const token = req.headers.authorization?.split(' ')[1];

		if (!token) {
			res.status(401).send({
				message: 'Unauthorized! Access token is required',
			} as ErrorResponse);
			if (allowUnauthenticated) {
				next();
			}
			return;
		}

		let userInfo: TokenInfo;

		try {
			userInfo = await router.serviceContainer.tokenGen.verifyAccessToken(
				token,
			);
		} catch (error) {
			console.error(error);
			res.status(401).send({
				message: 'Unauthorized! Invalid access token',
			} as ErrorResponse);
			if (allowUnauthenticated) {
				next();
			}
			return;
		}

		try {
			router.context.user =
				await router.serviceContainer.database.getUserById(
					userInfo.userId,
				);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: 'Failed to get user',
			} as ErrorResponse);
			if (allowUnauthenticated) {
				next();
			}
			return;
		}

		if (!router.context.user) {
			res.status(401).send({
				message: 'Unauthorized! User not found',
			} as ErrorResponse);
			if (allowUnauthenticated) {
				next();
			}
			return;
		}

		router.context.isAuthenticated = true;

		next();
	};
}
