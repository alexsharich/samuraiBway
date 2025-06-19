import {Device} from "../../db/devices-db-type";
import {devicesRepository} from "../repositories/devices-repository";
import {ObjectId} from "mongodb";
import {devicesCollection} from "../../repositories/DB";

export const devicesService = {
    async saveDevice(_id: ObjectId, ip: string, deviceName: string, createdAt: string, userId: string, expAt: string) {
        const result = await this.getExistingDevice(userId, deviceName)
        if (!result) {
            const device = new Device(ip, deviceName, createdAt, userId, expAt)
            await devicesRepository.createDevice(_id, device)
            return
        }
        await this.updateDevice(result._id, expAt, createdAt)
    },
    async deleteDevice(deviceId: string) {

    },
    async updateDevice(deviceId: ObjectId, expAt: string, createdAt: string) {
        await devicesRepository.updateDevice(deviceId, expAt, createdAt)
    },
    async getExistingDevice(userId: string, deviceName: string) {
        return devicesCollection.findOne({userId, deviceName})
    }
}