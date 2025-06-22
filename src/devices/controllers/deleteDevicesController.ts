import {Request, Response} from "express";
import {devicesService} from "../service/devices-service";

export const deleteDevicesController = async (req: Request, res: Response) => {
    const userId = req.userId!
    const deviceId = req.deviceId!
    const result = await devicesService.deleteDevices(deviceId, userId)
    if (!result) {
        res.sendStatus(401)
        return
    }
    res.sendStatus(204)
}