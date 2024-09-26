import { Router } from "express";

import { AuthValidations } from "./auth.validation";
import validateRequest from "../../middlewares/validateRequest";
import { AuthController } from "./auth.controller";
import { UserValidations } from "../user/user.validation";

const router = Router();

router.post(
    "/signup",
    validateRequest(UserValidations.userValidationSchema),
    AuthController.register
);

router.post(
    "/signin",
    validateRequest(AuthValidations.signinUserValidationSchema),
    AuthController.signin
);

export const AuthRoutes = router;