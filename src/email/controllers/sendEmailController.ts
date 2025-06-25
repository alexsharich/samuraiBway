import {Request, Response} from "express"
import {businessService} from "../../composition-root";

export const sendEmailController = async (req: Request, res: Response) => {
    const email = 'ppolskasim@gmail.com'
    const subject = 'Ulya la'
    const message = 'WOOOO NEW MEWSSAGE'
    await businessService.sendEmail(email, subject, message)
    res.send(200)
}