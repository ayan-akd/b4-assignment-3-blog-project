import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { UserServices } from './user.service';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserIntoDB(userData);
  const  resultToSend = {
    _id: result._id,
    name: result.name,
    email: result.email,
  };

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: resultToSend,
  });
});

const blockUser = catchAsync(async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  await UserServices.blockUser(id, token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
  });
});


export const UserControllers = {
  createUser,
  blockUser,
};
