import nodemailer from "nodemailer";
import {SETTINGS} from "../settings";

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string, code?: string) {
        /*let transport = nodemailer.createTransport({
            service: 'yandex',
            auth: {
                user: 'skotch3k2',
                pass: 'gyuinicxjfzorlsx'
            }
        })
console.log('transporter !!!!!')
        let info = await transport.sendMail({
            from: 'Alexander <skotch3k2@yandex.ru>',
            to: email,
            subject: subject,
            html: message
        })
        console.log(info)*/


        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true, // true для порта 465
            auth: {
                user: 'skotch3k2@yandex.ru',   // Твой яндекс email
                pass: 'gyuinicxjfzorlsx'  // Пароль или пароль приложения
            }
        });


// Письмо
        const mailOptions = {
            from: ' "Alexander" skotch3k2@yandex.ru',
            to: email,
            subject: subject,
            text: message,
            html: `<b>Привет!</b> Это тестовое письмо от <a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a> через <u>Яндекс</u>.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Ошибка:', error);
            }
            console.log('Письмо отправлено:', info.response);
        })


         transporter.verify(function(error, success) {
             if (error) {
                 console.log('Ошибка соединения:', error);
             } else {
                 console.log('Соединение установлено, готов к отправке писем!');
             }
         })
}










