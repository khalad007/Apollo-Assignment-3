import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const signup = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.createsignupIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});

export const userController = {
    signup,
};