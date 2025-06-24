import {Router} from "express";
import {getDevicesController} from "../devices/controllers/getDevicesController";
import {deleteDevicesController} from "../devices/controllers/deleteDevicesController";
import {deleteDeviceByIdController} from "../devices/controllers/deleteDeviceByIdController";
import {authRefreshMiddleware} from "../global-middleware/auth-refresh-middleware";

export const devicesRouter = Router()

devicesRouter.get('/devices', authRefreshMiddleware, getDevicesController)
devicesRouter.delete('/devices',authRefreshMiddleware, deleteDevicesController)
devicesRouter.delete('/devices/:deviceId',authRefreshMiddleware, deleteDeviceByIdController)
