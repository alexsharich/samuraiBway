import {devicesCollection} from "../../repositories/DB";

export class QueryDevicesRepository {
    async getDevices(userId: string) {
        const result = await devicesCollection.find({userId}).toArray()
        return result.map((res) => ({
            ip: res.ip,
            title: res.deviceName,
            lastActiveDate: res.createdAt,
            deviceId: res._id.toString()
        }))
    }
}