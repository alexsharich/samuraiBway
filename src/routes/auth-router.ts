import {Router} from "express";
import {
    authValidator, emailCodeResendingValidator, emailValidation,
    isCreatedUserValidator, passwordValidator,
    registrationValidator
} from "../auth/middlewares/authValidator";
import {authMiddleware} from "../global-middleware/auth-middleware";

import {authRefreshMiddleware} from "../global-middleware/auth-refresh-middleware";
import {apiRequestMiddleware} from "../devices/middlewares/devices-middleware";
import {emailValidator} from "../users/middlewares/usersValidator";
import {authController} from "../composition-root";
import {inputCheckErrorsMiddleware} from "../global-middleware/inputCheckErrorsMiddleware";

export const authRouter = Router()

authRouter.post('/registration', registrationValidator, apiRequestMiddleware, isCreatedUserValidator, authController.register)
authRouter.post('/registration-confirmation', emailCodeResendingValidator, apiRequestMiddleware, authController.registrationConfirmation)
authRouter.post('/registration-email-resending', emailValidation, apiRequestMiddleware, authController.resendRegistrationCode)
authRouter.post('/login', apiRequestMiddleware, ...authValidator, authController.login.bind(authController))
authRouter.post('/logout', authRefreshMiddleware, authController.logout)
authRouter.get('/me', authMiddleware, authController.me)
authRouter.post('/refresh-token', authRefreshMiddleware, authController.refreshToken)

authRouter.post('/password-recovery', emailValidator, inputCheckErrorsMiddleware, apiRequestMiddleware, authController.passwordRecovery.bind(authController))
authRouter.post('/new-password', passwordValidator, inputCheckErrorsMiddleware, authController.newPassword.bind(authController))

