import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';
import { blogsSearchableFields } from './blog.constant';

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', 'name email'),
    query,
  )
    .search(blogsSearchableFields)
    .authorFiltering()
    .filter()
    .sortBy()
    .sortOrder();
  const blogs = await blogQuery.modelQuery;
  return blogs;
};

const createBlogIntoDB = async (payload: IBlog, token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  const blogData = {
    ...payload,
    author: userId,
  };

  const newBlog = (await Blog.create(blogData)).populate(
    'author',
    'name email',
  );
  if (!newBlog) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Blog');
  }
  return newBlog;
};

export const BlogServices = {
  getAllBlogs,
  createBlogIntoDB,
};