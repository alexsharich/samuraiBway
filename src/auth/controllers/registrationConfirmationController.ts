import {authService} from "../service/auth-service";
import {Request,Response} from "express";

export const registrationConfirmationController= async (req:Request,res:Response)=>{
    const result = await authService.confirmEmail(req.body.code)
    if(!result){
        res.sendStatus(400)
        return
    }else{
        res.status(201).send()
    }
}