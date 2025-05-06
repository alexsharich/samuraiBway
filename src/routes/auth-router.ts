import {Router} from "express";
import {loginController} from "../auth/controllers/loginController";
import {
    authValidator, emailValidation,
    isCreatedUserValidator,
    registrationValidator
} from "../auth/middlewares/authValidator";
import {meController} from "../auth/controllers/meController";
import {authMiddleware} from "../global-middleware/auth-middleware";
import {registrationEmailController} from "../auth/controllers/resendRegistrationCodeController";
import {registerController} from "../auth/controllers/registerController";
import {registrationConfirmationController} from "../auth/controllers/registrationConfirmationController";

export const authRouter = Router()

authRouter.post('/registration', registrationValidator, isCreatedUserValidator, registerController)
authRouter.post('/registration-confirmation', registrationConfirmationController)
authRouter.post('/registration-email-resending',emailValidation, registrationEmailController)
authRouter.post('/login', authValidator, loginController)
authRouter.get('/me',  authMiddleware, meController)