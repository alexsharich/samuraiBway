import {Request, Response} from "express";
import {usersService} from "../service/users-service";
import {usersQueryRepository} from "../repositories/users-query-repository";
import {InputUserType} from "../../input-output-types/userType";

export const createUserController = async (req: Request<any,any,InputUserType>, res: Response) => {

    const isNewUserCreated = await usersService.createUser(req.body)

    if(Array.isArray(isNewUserCreated)){
        res.status(400).json({
            errorsMessages: isNewUserCreated
        })
        return
    }


        const newUser = await usersQueryRepository.findUser(isNewUserCreated as string)
        if (newUser) {
            res.status(201).json(newUser)
            return
        }


    res.sendStatus(404)
}