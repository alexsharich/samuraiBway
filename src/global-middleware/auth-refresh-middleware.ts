import {NextFunction, Request, Response} from "express";
import {container} from "../composition-root";
import {JwtService} from "../application/jwtService";
import {DevicesRepository} from "../devices/repositories/devices-repository";

const jwtService = container.get(JwtService)
const devicesRepository = container.get(DevicesRepository)

export const authRefreshMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken as string

    if (!refreshToken) {
        res.sendStatus(401)
        return
    }
    const token = jwtService.verifyRefreshToken(refreshToken)
    if (!token?.userId || !token.deviceId) {
        res.sendStatus(401)
        return
    }
    const userId = token.userId
    const deviceId = token.deviceId
    const iat = token.iat

    const device = await devicesRepository.getDeviceById(deviceId)


    if (!device) {
        res.sendStatus(401)
        return
    }

    if (device.userId !== userId) {
        res.sendStatus(401)
        return
    }

    if (device.createdAt !== new Date(iat! * 1000).toISOString()) {
        res.sendStatus(401)
        return
    }

    req.userId = userId
    req.deviceId = deviceId
    next()
}