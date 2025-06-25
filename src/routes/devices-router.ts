import {Router} from "express";

import {authRefreshMiddleware} from "../global-middleware/auth-refresh-middleware";
import {deviceController} from "../composition-root";

export const devicesRouter = Router()
// Потеря контекста
devicesRouter.get('/devices', authRefreshMiddleware, deviceController.getDevice)
devicesRouter.delete('/devices', authRefreshMiddleware, deviceController.deleteDevice)
devicesRouter.delete('/devices/:deviceId', authRefreshMiddleware, deviceController.deleteDeviceById)
