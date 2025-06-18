import {Device} from "../../db/devices-db-type";
import {devicesCollection} from "../../repositories/DB";
import {ObjectId} from "mongodb";

export const devicesRepository = {
    async createDevice(device: Device) { //???
        const deviceId = await devicesCollection.insertOne(device)
        return deviceId.insertedId.toHexString()
    },
    async deleteDevice(deviceId: string) {
        const objDeviceId = new ObjectId(deviceId)
        const result = await devicesCollection.deleteOne({_id: objDeviceId})
        return result.deletedCount === 1
    },
    async updateDevice(deviceId: string, expAt: string, createdAt: string) {
        const objId = new ObjectId(deviceId)
        const result = await devicesCollection.updateOne({_id: objId}, {
            $set: {
                expAt, createdAt
            }
        })
        return result.matchedCount === 1
    }
}