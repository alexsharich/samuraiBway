import {Request, Response} from "express"
import {businessServis} from "../../domain/businessServis";

export const sendEmailController = async (req: Request, res: Response) => {
    const email = 'ppolskasim@gmail.com'
    const subject = 'Ulya la'
    const message = 'WOOOO NEW MEWSSAGE'
    await businessServis.sendEmail(email, subject, message)
    res.send(200)
}