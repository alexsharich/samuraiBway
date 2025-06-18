export const DevicesDBType = {}

export class Device {
    _id:string
    ip: string
    deviceName: string
    createdAt: string
    userId: string
    expAt: string

    constructor(_id: string,
                ip: string,
                deviceName: string,
                createdAt: string,
                userId: string,
                expAt: string) {
        this.ip = ip
        this.deviceName = deviceName
        this.userId = userId
        this.createdAt = createdAt
        this.expAt = expAt
    }
}
