import {Request, Response} from 'express'
import {authService} from "../service/auth-service";
import {jwtServise} from "../../application/jwtService";
import {daysToMs} from "../../helpers/daysToMs";
import {ObjectId} from "mongodb";
import {devicesService} from "../../devices/service/devices-service";
import {devicesCollection} from "../../repositories/DB";
import {devicesRepository} from "../../devices/repositories/devices-repository";

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
    if (req.cookies.refreshToken) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        })
        res.sendStatus(401)
        return
    }
    const _id = new ObjectId()
    const {accessToken, refreshToken} = jwtServise.createToken(userId, String(_id))
    const decodedRefreshToken = jwtServise.decodeToken(refreshToken)
    const ip = '1'
    const deviceName = '2'

    try {
        await devicesService.saveDevice(_id, ip, deviceName, String(decodedRefreshToken?.iat), String(decodedRefreshToken?.userId), String(decodedRefreshToken?.exp))
    } catch (error) {
        throw new Error('Error')
    }

    console.log('DEVICES : ', await devicesCollection.find().toArray())
    res.cookie('refreshToken', refreshToken, {
        maxAge: (daysToMs(3)),
        httpOnly: true,
        secure: true
    })
    res.status(200).json({accessToken})
}