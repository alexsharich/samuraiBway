import {Request, Response} from "express";
import {devicesService} from "../service/devices-service";

export const getDevicesController = async (req: Request, res: Response) => {
    const userId = req.userId!
    const devices = await devicesService.getDevices(userId)
    res.status(200).send(devices)
}