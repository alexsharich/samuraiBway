import nodemailer from "nodemailer";

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string) {
        let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'alexandev444@gmail.com',
                pass: ''
            }
        })

        let info = await transport.sendMail({
            from: 'Alexander <alexandev444@gmail.com>',
            to: email,
            subject: subject,
            html: message
        })
        console.log(info)
    }
}