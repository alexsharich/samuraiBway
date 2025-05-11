import {Request, Response} from 'express'
import {authService} from "../service/auth-service";
import {jwtServise} from "../../application/jwtService";
import {daysToMs} from "../../helpers/daysToMs";

export type LoginInputType = {
    loginOrEmail: string,
    password: string
}

export const loginController = async (req: Request<any, any, LoginInputType>, res: Response) => {
    const userId = await authService.loginWithEmailOrLogin(req.body)
    if (userId) {
        const {accessToken, refreshToken} = jwtServise.createToken(userId)
        res.status(200).json({accessToken})
        res.cookie('refreshToken', refreshToken, {
            maxAge: (daysToMs(3)),
            httpOnly: true
        })
        return
    }
    res.sendStatus(401)
}