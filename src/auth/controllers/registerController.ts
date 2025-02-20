import {Request, Response} from "express";
import {usersService} from "../../users/service/users-service";

export const registerController = async (req:Request,res:Response)=>{
    //const user = await authService.createUserA(req.body.login,req.body.email,req.body.password)
    const user = await usersService.createUser(req.body,false)
    if(user){
        res.status(201).send()
    }else {
        res.status(400).send({message:''})
    }
}