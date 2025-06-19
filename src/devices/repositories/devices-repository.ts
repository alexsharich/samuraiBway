import {Device} from "../../db/devices-db-type";
import {devicesCollection} from "../../repositories/DB";
import {ObjectId} from "mongodb";

export const devicesRepository = {
    async createDevice(_id: ObjectId, device: Device) {
        const deviceId = await devicesCollection.insertOne({_id, ...device})
        console.log('_ID :',String(_id),deviceId)
        return deviceId.insertedId.toHexString()
    },
    async deleteDevice(deviceId: string) {
        const objDeviceId = new ObjectId(deviceId)
        const result = await devicesCollection.deleteOne({_id: objDeviceId})
        return result.deletedCount === 1
    },
    async updateDevice(deviceId: ObjectId, expAt: string, createdAt: string) {
        const result = await devicesCollection.updateOne({_id: deviceId}, {
            $set: {
                expAt, createdAt
            }
        })
        return result.matchedCount === 1
    }
}