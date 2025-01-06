import {Router} from 'express'
import {sendEmailController} from "../email/controllers/sendEmailController";

export const emailRouter = Router()

emailRouter.post('/send', sendEmailController)
