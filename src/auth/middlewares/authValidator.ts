import {body} from "express-validator";
import {inputCheckErrorsMiddleware} from "../../global-middleware/inputCheckErrorsMiddleware";

export const emailOrLoginValidator = body('loginOrEmail').trim().notEmpty().isString()

export const passwordValidator = body('password').trim().notEmpty().isString()

export const authValidator =[
    emailOrLoginValidator,
    passwordValidator,

    inputCheckErrorsMiddleware,
]