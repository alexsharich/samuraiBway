import {Router} from "express";
import {
    authValidator, emailCodeResendingValidator, emailValidation,
    isCreatedUserValidator, newPasswordValidator, passwordValidator,
    registrationValidator
} from "../auth/middlewares/authValidator";
import {authMiddleware} from "../global-middleware/auth-middleware";

import {authRefreshMiddleware} from "../global-middleware/auth-refresh-middleware";
import {apiRequestMiddleware} from "../devices/middlewares/devices-middleware";
import {emailValidator} from "../users/middlewares/usersValidator";
import {container} from "../composition-root";
import {inputCheckErrorsMiddleware} from "../global-middleware/inputCheckErrorsMiddleware";
import {AuthController} from "../auth/controllers/auth.controller";


const authController = container.get(AuthController)
export const authRouter = Router()

authRouter.post('/registration', registrationValidator, apiRequestMiddleware, isCreatedUserValidator, authController.register.bind(authController))
authRouter.post('/registration-confirmation', emailCodeResendingValidator, apiRequestMiddleware, authController.registrationConfirmation.bind(authController))
authRouter.post('/registration-email-resending', emailValidation, apiRequestMiddleware, authController.resendRegistrationCode.bind(authController))
authRouter.post('/login', apiRequestMiddleware, ...authValidator, authController.login.bind(authController))
authRouter.post('/logout', authRefreshMiddleware, authController.logout.bind(authController))
authRouter.get('/me', authMiddleware, authController.me)
authRouter.post('/refresh-token', authRefreshMiddleware, authController.refreshToken.bind(authController))

authRouter.post('/password-recovery', emailValidator, inputCheckErrorsMiddleware, apiRequestMiddleware, authController.passwordRecovery.bind(authController))
authRouter.post('/new-password', newPasswordValidator, inputCheckErrorsMiddleware, apiRequestMiddleware, authController.newPassword.bind(authController))

