import {emailAdapter} from "../adapters/emailAdapter";

export const emailManager = {
    async sendPasswordRecoveryMessage(user: any) {
    },
    async sendEmailConfirmationMessage(user) {
        await emailAdapter.sendEmail(user.email!, 'Email Confirmation', 'Передать код')
    }
}