import {Request, Response} from "express";
import {daysToMs} from "../../helpers/daysToMs";
import {ObjectId} from "mongodb";
import {devicesService, jwtService} from "../../composition-root";

export const refreshTokenController = async (req: Request, res: Response) => {
    const userId = req.userId
    const deviceId = req.deviceId
    if (!userId) {
        res.sendStatus(401)
        return
    }


    const {accessToken, refreshToken} = jwtService.createToken(userId, String(deviceId))
    const tokenDecoded = jwtService.decodeToken(refreshToken)

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