import WrapRouter from '../../../wrap_router';
import { Request, Response } from 'express';
import { GetAllBlogsRequest } from './request';
import { GetAllBlogsResponse } from './response';
import { ErrorResponse } from '../../../response';

const router = new WrapRouter();

router.get(
	'/',
	[],
	async (
		router: WrapRouter,
		req: Request<GetAllBlogsRequest>,
		res: Response<GetAllBlogsResponse | ErrorResponse>,
	) => {
		const blogs = await router.serviceContainer.database.getAllBlogs(
			Number(req.query.limit) || 10,
			Number(req.query.offset) || 0,
		);
		res.status(200).json({
			blogs,
		});
	},
);

export { router };
