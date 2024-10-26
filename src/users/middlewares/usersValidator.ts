import {body} from "express-validator";
import {inputCheckErrorsMiddleware} from "../../global-middleware/inputCheckErrorsMiddleware";

export const emailValidator = body('email').trim().notEmpty().isString().isEmail()
export const loginValidator =body('login').trim().notEmpty().isString().isLength({min: 3, max: 10})
export const passwordValidator = body('password').trim().notEmpty().isString().isLength({min: 6, max: 20})

export const usersValidator =[
    loginValidator,
    emailValidator,
    passwordValidator,

    inputCheckErrorsMiddleware,
]