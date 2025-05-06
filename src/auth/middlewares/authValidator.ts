import {body} from "express-validator";
import {inputCheckErrorsMiddleware} from "../../global-middleware/inputCheckErrorsMiddleware";
import {usersRepository} from "../../users/repositories/users-repository";
import {Request,Response} from "express";
import {NextFunction} from "express";
import {InputUserType} from "../../input-output-types/userType";

export const emailOrLoginValidator = body('loginOrEmail').trim().notEmpty().isString()
 const emailValidator = body('email').trim().notEmpty().isString()
 const loginValidator = body('login').trim().notEmpty().isString()

export const passwordValidator = body('password').trim().notEmpty().isString()

export const userIdValidator = body('userId').trim().notEmpty().isString()

export const  isCreatedUserValidator = async (req:Request<any,any,InputUserType>,res:Response,next:NextFunction) =>{
     const isCreatedUser = await usersRepository.checkUniqUserWithEmailOrLogin(req.body.login,req.body.email)
    if(isCreatedUser){
        res
            .status(404)
            .json({})
        return
    }
    next()
}

export const authValidator =[
    emailOrLoginValidator,
    passwordValidator,

    inputCheckErrorsMiddleware,
]
export const registrationValidator =[
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