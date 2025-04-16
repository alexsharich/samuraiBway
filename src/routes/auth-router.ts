import {Router} from "express";
import {loginController} from "../auth/controllers/loginController";
import {authValidator, isCreatedUserValidator, meValidator} from "../auth/middlewares/authValidator";
import {meController} from "../auth/controllers/meController";
import {authMiddleware} from "../global-middleware/auth-middleware";
import {registrationEmailController} from "../auth/controllers/resendRegistrationCodeController";
import {registerController} from "../auth/controllers/registerController";
import {registrationConfirmationController} from "../auth/controllers/registrationConfirmationController";

export const authRouter = Router()

authRouter.post('/registration', authValidator, isCreatedUserValidator, registerController)
authRouter.post('/registration-confirmation', registrationConfirmationController)
authRouter.post('/registration-email-resending', registrationEmailController)
authRouter.post('/login', authValidator, loginController)
authRouter.get('/me', meValidator, authMiddleware, meController)