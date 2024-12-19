import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { BlogServices } from './blog.service';

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogs();
  const resultToSend = result.map((blog) => ({
    _id: blog._id,
    title: blog.title,
    content: blog.content,
    author: blog.author,
  }));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: resultToSend,
  });
});

const createBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const blogData = req.body;
  const result = await BlogServices.createBlogIntoDB(blogData, token as string);
  const resultToSend = {
    _id: result._id,
    title: result.title,
    content: result.content,
    author: result.author,
  };

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: resultToSend,
  });
});

export const BlogControllers = {
  getAllBlogs,
  createBlog,
};
