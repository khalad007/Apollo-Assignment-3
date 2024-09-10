import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAuth, TUser } from './user.interface';
import { UserModel } from './user.model';

import bcrypt, { hash } from 'bcrypt';
import config from '../../config';
import { createToken } from './user.utils';

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  const savedUser = await UserModel.findById(result._id,'-isDeleted')
    .select('-password')
    .exec();
  return savedUser;
};

const DoingSigninIntoDb = async (payload: TAuth) => {
  // const {email} = payload
  const findUser = await UserModel.findOne({ email: payload.email },'-isDeleted');
  // console.log(findUser)
  if (!findUser) {
    throw new AppError(httpStatus.NOT_FOUND, "Couldn't found the account");
  }
  //  checking if the user already deleted

  const isDeleted = findUser.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This account is already deleted');
  }
  // checking if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    findUser.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(httpStatus.NOT_FOUND, "Password doesn't matched");
  }
  const { password, ...userWithoutEmail } = findUser.toObject();
  const jwtPayload = userWithoutEmail;

  const accessToken = createToken(
    jwtPayload,
    config.secret_access_token as string,
    '1hr',
  );

  // const refreshToken = createToken(
  //   jwtPayload,
  //   config.secret_access_token as string,
  //   "1hr"
  // );
  return { data: userWithoutEmail, token: accessToken };
};

export const UserServices = {
  createUserIntoDB,
  DoingSigninIntoDb,
};
