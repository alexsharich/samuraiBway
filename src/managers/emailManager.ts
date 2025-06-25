import {emailAdapter} from "../adapters/emailAdapter";

export class EmailManager  {
    async sendPasswordRecoveryMessage(user: any) {
    }
    async sendEmailConfirmationMessage(email:any,code:string) {
        await emailAdapter.sendEmail(email, 'Email Confirmation', 'Передать код',code)
    }
}