import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { UserControllers } from '../user/user.controller';
import { BlogControllers } from '../blog/blog.controller';

const router = express.Router();

router.patch(
  '/users/:id/block',
  auth(USER_ROLE.admin),
  UserControllers.blockUser,
);

router.delete(
  '/blogs/:id/',
  auth(USER_ROLE.admin),
  BlogControllers.deleteBlogByAdmin,
);

export const adminActionsRoutes = router;
