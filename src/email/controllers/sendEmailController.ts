import {Request, Response} from "express"
import nodemailer from 'nodemailer'
import {emailAdapter} from "../../adapters/emailAdapter";
import {businessServis} from "../../domain/businessServis";

export const sendEmailController = async (req: Request, res: Response) => {

    await businessServis.sendEmail(req.body.email, req.body.subject, req.body.message)
    res.send(200)
}