import {emailAdapter} from "../adapters/emailAdapter";

export class BusinessService {
    async sendEmail(email: string, subject: string, message: string, html: string) {
        await emailAdapter.sendEmail(email, subject, message, html)
    }
}