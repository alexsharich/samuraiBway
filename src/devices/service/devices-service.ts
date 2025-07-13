import {ObjectId} from "mongodb";
import {DevicesRepository} from "../repositories/devices-repository";
import {QueryDevicesRepository} from "../repositories/query-devices-repository";
import {inject, injectable} from "inversify";
import {Device, DeviceModel} from "../../db/devices-db-type";

enum STATUS_CODE_DEVICES {
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    FORBIDDEN = 403
}

@injectable()
export class DevicesService {
    constructor(@inject(DevicesRepository) private devicesRepository: DevicesRepository, @inject(QueryDevicesRepository) private queryDevicesRepository: QueryDevicesRepository) {

    }

    async saveDevice(_id: ObjectId, ip: string, deviceName: string, createdAt: string, userId: string, expAt: string) {

        const device: Device = {ip: ip, deviceName: deviceName, createdAt: createdAt, userId: userId, expAt: expAt}
        await this.devicesRepository.createDevice(_id, device)
        return
    }

    async deleteDeviceById(deviceId: string, userId: string): Promise<STATUS_CODE_DEVICES> {
        const device = await this.devicesRepository.getDeviceById(deviceId)
        if (!device) {
            return STATUS_CODE_DEVICES.NOT_FOUND
        }
        if (device.userId !== userId) {
            return STATUS_CODE_DEVICES.FORBIDDEN
        }
        await DeviceModel.deleteOne({_id: deviceId}).exec()

        return STATUS_CODE_DEVICES.NO_CONTENT
    }

    async deleteDevices(deviceId: string, userId: string): Promise<boolean> {
        return await this.devicesRepository.deleteDevices(userId, deviceId)

    }

    async updateDevice(deviceId: ObjectId, expAt: string, createdAt: string) {
        await this.devicesRepository.updateDevice(deviceId, expAt, createdAt)
    }

    async getDevices(userId: string) {
        return await this.queryDevicesRepository.getDevices(userId)
    }
}