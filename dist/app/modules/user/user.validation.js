"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Name is required' })
            .refine((value) => /^[A-Z]/.test(value), {
            message: 'Name must start with a capital letter',
        }),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email({ message: 'Invalid email address' }),
        password: zod_1.z
            .string({
            required_error: 'Password is required',
            invalid_type_error: 'Password must be string',
        })
            .min(6, { message: 'Password must be at least 6 characters long' }),
    }),
});
exports.UserValidation = {
    createUserValidationSchema,
};
