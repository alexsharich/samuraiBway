import {Request,Response} from 'express'
import {authService} from "../service/auth-service";
import {usersRepository} from "../../users/repositories/users-repository";

export type LoginInputType ={
    loginOrEmail: string,
    password: string
}
export const loginController = async (req: Request<any,any,LoginInputType>, res: Response) => {
const isLogined = await authService.loginWithEmailOrLogin(req.body)
    if(isLogined){
        res.sendStatus(204)
        return
    }
    res.sendStatus(401)
}