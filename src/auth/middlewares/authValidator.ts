import {body} from "express-validator";
import {inputCheckErrorsMiddleware} from "../../global-middleware/inputCheckErrorsMiddleware";
import {Request, Response, NextFunction} from "express";
import {InputUserType} from "../../input-output-types/userType";
import {usersRepository} from "../../composition-root";

export const emailOrLoginValidator = body('loginOrEmail').trim().notEmpty().isString()
const emailValidator = body('email').trim().notEmpty().isString().isEmail().withMessage('Invalid email format')
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage('Email must match the specified pattern')
const loginValidator = body('login').trim().notEmpty().isString().isLength({
    min: 3,
    max: 10
}).withMessage('more then 10 or 2')

export const passwordValidator = body('password').trim().notEmpty().isString().isLength({
    min: 6,
    max: 20
}).withMessage('more then 20 or 5')

export const userIdValidator = body('userId').trim().notEmpty().isString()

export const codeResendingValidator = body('code').trim().notEmpty().isString().withMessage('invalid code')
export const isCreatedUserValidator = async (req: Request<any, any, InputUserType>, res: Response, next: NextFunction) => {
    const isCreatedUser = await usersRepository.checkUniqUserWithEmailOrLogin(req.body.login, req.body.email)
    if (isCreatedUser) {
        const field = isCreatedUser.accountData.email === req.body.email ? 'email' : 'login'
        res
            .status(400)
            .json({errorsMessages: [{message: '123123', field: field}]})
        return
    }
    next()
}

export const authValidator = [
    emailOrLoginValidator,
    passwordValidator,

    inputCheckErrorsMiddleware,
]
export const registrationValidator = [
    loginValidator,
    emailValidator,
    passwordValidator,

    inputCheckErrorsMiddleware,
]
export const meValidator = [
    emailValidator,
    loginValidator,
    userIdValidator,
    inputCheckErrorsMiddleware,
]
export const emailValidation = [
    emailValidator,

    inputCheckErrorsMiddleware,
]
export const emailCodeResendingValidator = [
    codeResendingValidator,

    inputCheckErrorsMiddleware,
]