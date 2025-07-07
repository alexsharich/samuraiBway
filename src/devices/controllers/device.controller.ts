import {Request, Response} from "express";
import {DevicesService} from "../service/devices-service";
import {inject, injectable} from "inversify";

@injectable()
export class DeviceController {
    constructor(@inject(DevicesService) private devicesService: DevicesService) {

    }

    async getDevice(req: Request, res: Response) {
        const userId = req.userId!
        const devices = await this.devicesService.getDevices(userId)
        res.status(200).send(devices)
    }

    async deleteDeviceById(req: Request<{ deviceId: string }>, res: Response) {
        const userId = req.userId
        const deviceId = req.params.deviceId
        if (!userId || !deviceId) {
            res.sendStatus(401)
            return
        }
        const result = await this.devicesService.deleteDeviceById(deviceId, userId)
        res.sendStatus(result)
    }

    async deleteDevice(req: Request, res: Response) {
        const userId = req.userId!
        const deviceId = req.deviceId!
        const result = await this.devicesService.deleteDevices(deviceId, userId)
        if (!result) {
            res.sendStatus(401)
            return
        }
        res.sendStatus(204)
    }
}