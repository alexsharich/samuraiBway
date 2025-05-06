import {emailAdapter} from "../adapters/emailAdapter";
import {emailManager} from "../managers/emailManager";

export const businessServis = {
    async sendEmail(email: string, subject: string, message: string, code?: string) {
        await emailAdapter.sendEmail(email, subject, message, code)
    },
    async passwordRecovery() {
        await emailManager.sendPasswordRecoveryMessage({})
        {

        }
    }

}