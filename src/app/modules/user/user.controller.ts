import httpStatus from 'http-status';

import {  RequestHandler } from 'express';
import sendResponse, { sendResponseWithToken } from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

const createUser: RequestHandler = catchAsync(async (req, res) => {

  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

const SignInUser : RequestHandler = catchAsync(async(req,res)=>{
  const result = await UserServices.DoingSigninIntoDb(req.body)
  sendResponseWithToken(res,{
    success:true,
    statusCode:httpStatus.OK,
    message:"User logged in successfully",
    data:result.data,
    token:result.token
  })
})
export const UserControllers = {
  createUser,SignInUser
};
