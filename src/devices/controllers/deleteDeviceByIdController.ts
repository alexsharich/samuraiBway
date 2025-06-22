import {Request, Response} from "express";
import {devicesService} from "../service/devices-service";


export const deleteDeviceByIdController = async (req: Request<{ deviceId: string }>, res: Response) => {
    const userId = req.userId
    const deviceId = req.params.deviceId
    if (!userId || !deviceId) {
        res.sendStatus(401)
        return
    }
    const result = await devicesService.deleteDeviceById(deviceId, userId)
    res.sendStatus(result)
}