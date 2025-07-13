import {injectable} from "inversify";
import {DeviceModel} from "../../db/devices-db-type";

@injectable()
export class QueryDevicesRepository {
    async getDevices(userId: string) {
        const result = await DeviceModel.find({userId}).lean().exec()
        return result.map((res) => ({
            ip: res.ip,
            title: res.deviceName,
            lastActiveDate: res.createdAt,
            deviceId: res._id.toString()
        }))
    }
}