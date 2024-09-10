import express from 'express';
import { UserControllers } from './user.controller';

import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const Auth = express.Router();

Auth.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);
Auth.post(
  '/signin',
  validateRequest(UserValidation.AuthValidationSchema),
  UserControllers.SignInUser,
);

export const AuthRoutes = Auth;
