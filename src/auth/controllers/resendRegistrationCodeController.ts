import {Request, Response} from "express";
import {authService} from "../service/auth-service";

export const resendRegistrationCodeController = async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.code)
    // if(result){
    //     res.status(201).send()
    // }else{
    //     res.sendStatus(400)
    // }
}