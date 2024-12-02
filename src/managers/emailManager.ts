import {emailAdapter} from "../adapters/emailAdapter";

export const emailManager = {
    async sendPasswordRecoveryMessage(user: any) {
        await emailAdapter.sendEmail(user.email!, '', '')
    },
    async sendEmailConfirmationMessage(user){

    }
}