import * as authRoutes from './routes/auth';
import * as blogRoutes from './routes/blog';
import WrapRouter from '../wrap_router';

const router = new WrapRouter();

router.addChild(authRoutes.router);
router.router.use('/auth', authRoutes.router.router);

router.addChild(blogRoutes.router);
router.router.use('/blogs', blogRoutes.router.router);

export { router };
