import {Request, Response} from 'express'
import {authService} from "../service/auth-service";
import {jwtServise} from "../../application/jwtService";
import {daysToMs} from "../../helpers/daysToMs";
import {ObjectId} from "mongodb";
import {devicesService} from "../../devices/service/devices-service";

export type LoginInputType = {
    loginOrEmail: string,
    password: string
}

export const loginController = async (req: Request<any, any, LoginInputType>, res: Response) => {
    const userId = await authService.loginWithEmailOrLogin(req.body)
    if (!userId) {
        res.sendStatus(401)
        return
    }
    const _id = new ObjectId()
    const {accessToken, refreshToken} = jwtServise.createToken(userId, String(_id))
    const decodedRefreshToken = jwtServise.decodeToken(refreshToken)
    const ip = '1'
    const deviceName = '2'

    await devicesService.createDevice(_id,ip, deviceName, String(decodedRefreshToken?.iat), String(decodedRefreshToken?.userId), String(decodedRefreshToken?.exp))
    res.cookie('refreshToken', refreshToken, {
        maxAge: (daysToMs(3)),
        httpOnly: true,
        secure: true
    })
    res.status(200).json({accessToken})
}