import nodemailer from "nodemailer";
import {emailAdapter} from "../adapters/emailAdapter";
import {emailManager} from "../managers/emailManager";

export const businessServis = {
    async sendEmail(email: string, subject: string, message: string) {
        await emailAdapter.sendEmail(email, subject, message)
    },
    async passwordRecovery() {
        await emailManager.sendPasswordRecoveryMessage({})
        {

        }
    }

}