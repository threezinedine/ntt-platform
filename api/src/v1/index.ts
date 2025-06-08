import * as authRoutes from './routes/auth';
import WrapRouter from '../wrap_router';

const router = new WrapRouter();

router.addChild(authRoutes.router);
router.router.use('/auth', authRoutes.router.router);

export { router };
