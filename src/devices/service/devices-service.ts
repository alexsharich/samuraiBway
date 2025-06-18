import {Device} from "../../db/devices-db-type";
import {devicesRepository} from "../repositories/devices-repository";

export const devicesService = {
    async createDevice(_id, ip: string, deviceName: string, createdAt: string, userId: string, expAt: string) {
        const device = new Device(_id, ip, deviceName, createdAt, userId, expAt)
        await devicesRepository.createDevice(device)
    },
    async deleteDevice(deviceId: string) {

    },
    async updateDevice(deviceId: string, expAt: string, createdAt: string) {

    }
}