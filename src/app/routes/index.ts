import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { adminActionsRoutes } from '../modules/adminActions/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/admin',
    route: adminActionsRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
