import {emailAdapter} from "../adapters/emailAdapter";

export const emailManager = {
    async sendPasswordRecoveryMessage(user: any) {
    },
    async sendEmailConfirmationMessage(email:any,code:string) {
        await emailAdapter.sendEmail(email, 'Email Confirmation', 'Передать код',code)
    }
}