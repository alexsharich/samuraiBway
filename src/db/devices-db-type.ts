export class Device {
    ip: string
    deviceName: string
    createdAt: string
    userId: string
    expAt: string

    constructor(ip: string,
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
