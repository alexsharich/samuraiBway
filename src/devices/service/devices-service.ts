import {Device} from "../../db/devices-db-type";
import {ObjectId} from "mongodb";
import {devicesCollection} from "../../repositories/DB";
import {DevicesRepository} from "../repositories/devices-repository";
import {QueryDevicesRepository} from "../repositories/query-devices-repository";

enum STATUS_CODE_DEVICES {
    NO_CONTENT = 204,
    NOT_FOUND = 404,
    FORBIDDEN = 403
}

export class DevicesService  {
    constructor(private devicesRepository:DevicesRepository, private queryDevicesRepository: QueryDevicesRepository){

    }
    async saveDevice(_id: ObjectId, ip: string, deviceName: string, createdAt: string, userId: string, expAt: string) {
        const device = new Device(ip, deviceName, createdAt, userId, expAt)
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
        await devicesCollection.deleteOne({_id: new ObjectId(deviceId)})
        return STATUS_CODE_DEVICES.NO_CONTENT
    }
    async deleteDevices(deviceId: string, userId: string): Promise<boolean> {
        const result = await this.devicesRepository.deleteDevices(userId, deviceId)
        return result
    }
    async updateDevice(deviceId: ObjectId, expAt: string, createdAt: string) {
        await this.devicesRepository.updateDevice(deviceId, expAt, createdAt)
    }
    async getDevices(userId: string) {
        return await this.queryDevicesRepository.getDevices(userId)
    }
}