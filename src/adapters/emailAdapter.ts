import nodemailer from "nodemailer";
import {SETTINGS} from "../settings";

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string) {
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alexandralexandrov444@gmail.com',
                pass: SETTINGS.SEND_EMAIL_PASS
            }
        })

        let info = await transport.sendMail({
            from: 'Alexander <alexandralexandrov444@gmail.com>',
            to: email,
            subject: subject,
            html: message
        })
        console.log(info)
    }
}