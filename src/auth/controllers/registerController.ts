import {Request, Response} from "express";
import {authService} from "../service/auth-service";

export const registerController = async (req:Request,res:Response)=>{
    const user = await authService.createUserA(req.body.login,req.body.email,req.body.password)
    res.status(201).send()
}