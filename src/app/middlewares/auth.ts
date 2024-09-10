import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtHeader, JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserModel } from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles:TUserRole[]) => {
  return catchAsync(async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token.slice(7),
      config.secret_access_token as string,
    ) as JwtPayload;
    const { name, email, role, phone, address, isDeleted} = decoded;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This user is not found',
      );
    }

    const DeletedUser = user.isDeleted
    if(DeletedUser){
      throw new AppError(
        httpStatus.FORBIDDEN,
        'This user is no longer deleted',
      );
    }

    if(requiredRoles && !requiredRoles.includes(role)){
      res.status(401).json({
        success: false,
        statusCode: 401,
        message: "You have no access to this route",
      })
    }
   // @ts-ignore
    req.user = decoded as JwtPayload

    next();
  });
};

export default auth;
