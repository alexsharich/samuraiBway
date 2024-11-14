import {Request,Response} from 'express'
import {authService} from "../service/auth-service";
import {usersRepository} from "../../users/repositories/users-repository";
import {jwtServise} from "../../application/jwtService";

export type LoginInputType ={
    loginOrEmail: string,
    password: string
}
export const loginController = async (req: Request<any,any,LoginInputType>, res: Response) => {
const userId = await authService.loginWithEmailOrLogin(req.body)
    if(userId){
        const accessToken = jwtServise.createToken(userId)
        res.status(200).json({accessToken})
        return
    }
    res.sendStatus(401)
}