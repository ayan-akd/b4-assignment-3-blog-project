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
exports.BlogControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const blog_service_1 = require("./blog.service");
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_service_1.BlogServices.getAllBlogs(req.query);
    const resultToSend = result.map((blog) => ({
        _id: blog._id,
        title: blog.title,
        content: blog.content,
        author: blog.author,
    }));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: resultToSend,
    });
}));
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers.authorization;
    token = (token === null || token === void 0 ? void 0 : token.includes('Bearer')) ? token === null || token === void 0 ? void 0 : token.replace(/^Bearer\s+/, '') : token;
    const blogData = req.body;
    const result = yield blog_service_1.BlogServices.createBlogIntoDB(blogData, token);
    const resultToSend = {
        _id: result._id,
        title: result.title,
        content: result.content,
        author: result.author,
    };
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: resultToSend,
    });
}));
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let token = req.headers.authorization;
    token = (token === null || token === void 0 ? void 0 : token.includes('Bearer')) ? token === null || token === void 0 ? void 0 : token.replace(/^Bearer\s+/, '') : token;
    const blogData = req.body;
    const result = yield blog_service_1.BlogServices.updateBlog(id, blogData, token);
    const resultToSend = {
        _id: result === null || result === void 0 ? void 0 : result._id,
        title: result === null || result === void 0 ? void 0 : result.title,
        content: result === null || result === void 0 ? void 0 : result.content,
        author: result === null || result === void 0 ? void 0 : result.author,
    };
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog updated successfully',
        data: resultToSend,
    });
}));
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let token = req.headers.authorization;
    token = (token === null || token === void 0 ? void 0 : token.includes('Bearer')) ? token === null || token === void 0 ? void 0 : token.replace(/^Bearer\s+/, '') : token;
    yield blog_service_1.BlogServices.deleteBlog(id, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog deleted successfully',
    });
}));
const deleteBlogByAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let token = req.headers.authorization;
    token = (token === null || token === void 0 ? void 0 : token.includes('Bearer')) ? token === null || token === void 0 ? void 0 : token.replace(/^Bearer\s+/, '') : token;
    yield blog_service_1.BlogServices.deleteBlogByAdmin(id, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog deleted successfully',
    });
}));
exports.BlogControllers = {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    deleteBlogByAdmin,
};
