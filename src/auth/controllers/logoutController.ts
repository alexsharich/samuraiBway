import {Request, Response} from "express";
import {authService} from "../service/auth-service";
import {devicesService} from "../../devices/service/devices-service";

export const logoutController = async (req: Request, res: Response) => {
    const deviceId = req.deviceId
    const userId = req.userId
    await devicesService.deleteDeviceById(deviceId!, userId!)
    res.clearCookie('refreshToken')
    res.status(204).send()
}