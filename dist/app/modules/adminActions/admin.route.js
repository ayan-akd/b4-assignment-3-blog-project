"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminActionsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const user_controller_1 = require("../user/user.controller");
const blog_controller_1 = require("../blog/blog.controller");
const router = express_1.default.Router();
router.patch('/users/:id/block', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.blockUser);
router.delete('/blogs/:id/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), blog_controller_1.BlogControllers.deleteBlogByAdmin);
exports.adminActionsRoutes = router;
