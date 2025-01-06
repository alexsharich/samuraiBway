import {Request, Response} from "express";
import {authService} from "../service/auth-service";

export const registrationEmailController = async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.email)
    if(result){
        res.status(201).send()
    }else{
        res.sendStatus(400)
    }
}