import {
	Request,
	Response,
	Router as ExpressRouter,
	NextFunction,
} from 'express';
import ServiceContainer from './services';
import Context from './context';
import { Middleware } from './middleware';

type RouteHandler = (router: Router, req: Request, res: Response) => void;

class Router {
	public router: ExpressRouter;
	public serviceContainer: ServiceContainer;
	public context: Context;
	private children: Router[];

	constructor() {
		this.router = ExpressRouter();
		this.children = [];
	}

	setServiceContainer(serviceContainer: ServiceContainer) {
		this.serviceContainer = serviceContainer;

		this.children.forEach((child) => {
			child.setServiceContainer(serviceContainer);
		});
	}

	setContext(context: Context) {
		this.context = context;

		this.children.forEach((child) => {
			child.setContext(context);
		});
	}

	addChild(child: Router) {
		this.children.push(child);
	}

	get(route: string, middlewares: Middleware[], handler: RouteHandler) {
		this.router.get(
			route,
			...middlewares,
			(req: Request, res: Response) => {
				handler(this, req, res);
			},
		);
	}

	post(route: string, middlewares: Middleware[], handler: RouteHandler) {
		this.router.post(
			route,
			...middlewares,
			(req: Request, res: Response) => {
				handler(this, req, res);
			},
		);
	}

	put(route: string, middlewares: Middleware[], handler: RouteHandler) {
		this.router.put(
			route,
			...middlewares,
			(req: Request, res: Response) => {
				handler(this, req, res);
			},
		);
	}

	patch(route: string, middlewares: Middleware[], handler: RouteHandler) {
		this.router.patch(
			route,
			...middlewares,
			(req: Request, res: Response) => {
				handler(this, req, res);
			},
		);
	}

	delete(route: string, middlewares: Middleware[], handler: RouteHandler) {
		this.router.delete(
			route,
			...middlewares,
			(req: Request, res: Response) => {
				handler(this, req, res);
			},
		);
	}
}

export default Router;
