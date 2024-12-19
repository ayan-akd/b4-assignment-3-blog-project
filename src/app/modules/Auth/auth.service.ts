import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  // checking if the user is already deleted

  // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  //checking if the password is correct
  const checkPassword = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!checkPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }

  //create token and sent to the  client

  const jwtPayload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (!userStatus) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }


  const jwtPayload = {
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
