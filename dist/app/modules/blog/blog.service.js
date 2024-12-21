"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = require("./blog.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const blog_constant_1 = require("./blog.constant");
const getAllBlogs = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.Blog.find().populate('author', 'name email'), query)
        .search(blog_constant_1.blogsSearchableFields)
        .authorFiltering()
        .filter()
        .sortBy()
        .sortOrder();
    const blogs = yield blogQuery.modelQuery;
    return blogs;
});
const createBlogIntoDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { userId } = decoded;
    const blogData = Object.assign(Object.assign({}, payload), { author: userId });
    const newBlog = (yield blog_model_1.Blog.create(blogData)).populate('author', 'name email');
    if (!newBlog) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Blog');
    }
    return newBlog;
});
const updateBlog = (id, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { userId } = decoded;
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    if (blog.author.toString() !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to update this blog');
    }
    const updatedBlog = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate('author', 'name email');
    return updatedBlog;
});
const deleteBlog = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { userId } = decoded;
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    if (blog.author.toString() !== userId) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to delete this blog');
    }
    const deletedBlog = yield blog_model_1.Blog.findByIdAndDelete(id);
    return deletedBlog;
});
const deleteBlogByAdmin = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { role } = decoded;
    const blog = yield blog_model_1.Blog.findById(id);
    if (!blog) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Blog not found');
    }
    if (role !== 'admin') {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to delete this blog');
    }
    yield blog_model_1.Blog.findByIdAndDelete(id);
});
exports.BlogServices = {
    getAllBlogs,
    createBlogIntoDB,
    updateBlog,
    deleteBlog,
    deleteBlogByAdmin,
};
