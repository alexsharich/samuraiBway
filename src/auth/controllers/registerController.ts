import {Request, Response} from "express";
import {authService} from "../../composition-root";

export const registerController = async (req:Request,res:Response)=>{
    const user = await authService.createUser(req.body.login,req.body.email,req.body.password)
    if(user){
        res.status(204).send()
    }else {
        res.status(400).send( { errorsMessages: [{ message: "Email error", field: "email" }] })
    }
}