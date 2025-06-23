import {Request, Response} from "express";
import {jwtServise} from "../../application/jwtService";
import {daysToMs} from "../../helpers/daysToMs";
import {devicesService} from "../../devices/service/devices-service";
import {ObjectId} from "mongodb";

export const refreshTokenController = async (req: Request, res: Response) => {
    const userId = req.userId
    const deviceId = req.deviceId
    if (!userId) {
        res.sendStatus(401)
        return
    }


    const {accessToken, refreshToken} = jwtServise.createToken(userId, String(deviceId))
    const tokenDecoded = jwtServise.decodeToken(refreshToken)

    if (!tokenDecoded) {
        res.sendStatus(401)
        return
    }
    await devicesService.updateDevice(new ObjectId(deviceId!), new Date(tokenDecoded?.exp! * 1000).toISOString(), new Date(tokenDecoded?.iat! * 1000).toISOString())

    res.cookie('refreshToken', refreshToken, {
        maxAge: (daysToMs(3)),
        httpOnly: true,
        secure: true
    })
    res.status(200).json({accessToken})

}