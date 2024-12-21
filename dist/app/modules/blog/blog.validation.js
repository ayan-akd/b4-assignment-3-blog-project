"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = exports.updateBlogValidationSchema = exports.createBlogValidationSchema = void 0;
const zod_1 = require("zod");
exports.createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }),
        content: zod_1.z.string({ required_error: 'Content is required' }),
        author: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
exports.updateBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: 'Title is required' }).optional(),
        content: zod_1.z.string({ required_error: 'Content is required' }).optional(),
        author: zod_1.z.string().optional(),
        isPublished: zod_1.z.boolean().optional(),
    }),
});
exports.BlogValidation = {
    createBlogValidationSchema: exports.createBlogValidationSchema,
    updateBlogValidationSchema: exports.updateBlogValidationSchema,
};
