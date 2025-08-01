import {Router} from "express";

import {authRefreshMiddleware} from "../global-middleware/auth-refresh-middleware";
import {container} from "../composition-root";


import {DeviceController} from "../devices/controllers/device.controller";

const deviceController = container.get(DeviceController)
export const devicesRouter = Router()
// Потеря контекста
devicesRouter.get('/devices', authRefreshMiddleware, deviceController.getDevice.bind(deviceController))
devicesRouter.delete('/devices', authRefreshMiddleware, deviceController.deleteDevice.bind(deviceController))
devicesRouter.delete('/devices/:deviceId', authRefreshMiddleware, deviceController.deleteDeviceById.bind(deviceController))
