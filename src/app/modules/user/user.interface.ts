/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role: 'admin' | 'user';
  isBlocked: boolean;
}

export interface UserModel extends Model<IUser> {

  isUserExistsByEmail(email: string): Promise<IUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type IUserRole = keyof typeof USER_ROLE;
