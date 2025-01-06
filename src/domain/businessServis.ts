import nodemailer from "nodemailer";
import {emailAdapter} from "../adapters/emailAdapter";
import {emailManager} from "../managers/emailManager";

export const businessServis = {
    async sendEmail(email, subject, message) {
        await emailAdapter.sendEmail(email, subject, message)
    },
    async passwordRecovery() {
        await emailManager.sendPasswordRecoveryMessage({})
        {
            
        }
    }

}