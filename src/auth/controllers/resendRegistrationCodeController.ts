import {Request, Response} from "express";
import {authService} from "../../composition-root";

export const registrationEmailController = async (req: Request, res: Response) => {
    const user = await authService.resendingEmail(req.body.email)
    if(!user){
        res.status(400).send({ errorsMessages: [{ message: '123123', field: "email" }] })
        return
    }
    res.status(204).send()
}