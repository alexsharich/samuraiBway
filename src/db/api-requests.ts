/*export class ApiRequest {
    IP: string
    URL: string

    constructor(IP: string, URL: string, public date: string) {
        this.IP = IP
        this.URL = URL
    }
}*/

import {HydratedDocument, model, Model, Schema} from "mongoose";
import {Device, DeviceModelType} from "./devices-db-type";

export interface ApiRequest {
    IP: string
    URL: string
}

export type ApiRequestModelType = Model<ApiRequest>
export type ApiRequestDocument = HydratedDocument<ApiRequest>

const ApiRequestSchema = new Schema<ApiRequest>({
    IP: {type: String, required: true},
    URL: {type: String, required: true}
})

export const ApiRequestModel = model<ApiRequest, ApiRequestModelType>('apiRequests', ApiRequestSchema)