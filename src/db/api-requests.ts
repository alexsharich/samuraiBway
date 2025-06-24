export class ApiRequest {
    IP: string
    URL: string

    constructor(IP: string, URL: string, public date: string) {
        this.IP = IP
        this.URL = URL
    }
}