import {Router} from "express";
import {loginController} from "../auth/controllers/loginController";
import {
    authValidator, emailCodeResendingValidator, emailValidation,
    isCreatedUserValidator,
    registrationValidator
} from "../auth/middlewares/authValidator";
import {meController} from "../auth/controllers/meController";
import {authMiddleware} from "../global-middleware/auth-middleware";
import {registrationEmailController} from "../auth/controllers/resendRegistrationCodeController";
import {registerController} from "../auth/controllers/registerController";
import {registrationConfirmationController} from "../auth/controllers/registrationConfirmationController";
import {refreshTokenController} from "../auth/controllers/refreshTokenController";
import {logoutController} from "../auth/controllers/logoutController";
import {authRefreshMiddleware} from "../global-middleware/auth-refresh-middleware";
import {apiRequestMiddleware} from "../devices/middlewares/devices-middleware";
import {inputCheckErrorsMiddleware} from "../global-middleware/inputCheckErrorsMiddleware";

export const authRouter = Router()

authRouter.post('/registration', registrationValidator, apiRequestMiddleware, isCreatedUserValidator, registerController)
authRouter.post('/registration-confirmation', emailCodeResendingValidator, apiRequestMiddleware, registrationConfirmationController)
authRouter.post('/registration-email-resending', emailValidation, apiRequestMiddleware, registrationEmailController)
authRouter.post('/login', apiRequestMiddleware, ...authValidator, loginController) /// TODO
authRouter.post('/logout', authRefreshMiddleware, logoutController)
authRouter.get('/me', authMiddleware, meController)
authRouter.post('/refresh-token', authRefreshMiddleware, refreshTokenController)

