import {ObjectId} from "mongodb";
import {injectable} from "inversify";
import {Device, DeviceModel} from "../../db/devices-db-type";

@injectable()
export class DevicesRepository {
    async createDevice(_id: ObjectId, device: Device) {
        const newDevice = await DeviceModel.insertOne({_id, ...device})
        await newDevice.save()
        return newDevice._id.toString()
    }

    async deleteDevice(deviceId: string) {
        const result = await DeviceModel.deleteOne({_id: deviceId}).exec()
        return result.deletedCount === 1
    }

    async deleteDevices(userId: string, deviceId: string) {
        const result = await DeviceModel.deleteMany({userId, _id: {$ne: new ObjectId(deviceId)}}).exec()
        return result.deletedCount >= 1
    }

    async updateDevice(deviceId: ObjectId, expAt: string, createdAt: string) {
        /*  const result = await devicesCollection.updateOne({_id: deviceId}, {
              $set: {
                  expAt, createdAt
              }
          })*/
        const device = await DeviceModel.findById(deviceId).exec()
        if (!device) {
            return false
        }
        device.expAt = expAt
        device.createdAt = createdAt
        await device.save()
        return true
    }

    async getDeviceById(deviceId: string) {
        return await DeviceModel.findById(deviceId).exec()
    }
}