import {HydratedDocument, model, Model, Schema} from "mongoose";

export interface Device {
    ip: string
    deviceName: string
    createdAt: string
    userId: string
    expAt: string
}

export type DeviceModelType = Model<Device>
export type DeviceDocument = HydratedDocument<Device>

const DeviceSchema = new Schema<Device>({
    ip: {type: String, required: true},
    deviceName: {type: String, required: true},
    createdAt: {type: String, required: true},
    userId: {type: String, required: true},
    expAt: {type: String, required: true}
})

export const DeviceModel = model<Device, DeviceModelType>('devices', DeviceSchema)


