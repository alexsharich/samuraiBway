import {Request, Response} from "express";
import {authService} from "../service/auth-service";

export const registrationEmailController = async (req: Request, res: Response) => {
    await authService.resendingEmail(req.body.email)
    res.status(204).send()
}