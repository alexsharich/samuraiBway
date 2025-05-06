import nodemailer from "nodemailer";

export const emailAdapter = {
    async sendEmail(email: string, subject: string, message: string, code?: string) {

        const transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'skotch3k2@yandex.ru',
                pass: 'gyuinicxjfzorlsx'
            }
        });


// Письмо
        const mailOptions = {
            from: ' "Alexander" skotch3k2@yandex.ru',
            to: email,
            subject: subject,
            text: message,
            html: `<b>Привет!</b> Пройди по ссылке <a href='https://somesite.com/confirm-email?code=${code}'>чтобы подтвердить регистрацию  </a> через <u>Яндекс</u>.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log('Ошибка:', error);
            }
            console.log('Письмо отправлено:', info.response);
        })


        transporter.verify(function (error, success) {
            if (error) {
                console.log('Ошибка соединения:', error);
            } else {
                console.log('Соединение установлено, готов к отправке писем!');
            }
        })
    }
}








