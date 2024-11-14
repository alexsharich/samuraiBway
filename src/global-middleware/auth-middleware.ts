import {NextFunction,Request,Response} from "express";
import {jwtServise} from "../application/jwtService";


export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
const auth = req.headers['authorization'];
if(!auth){
    res.sendStatus(401)
    return
}
const token = auth.split(' ')[1]
    const user_id = await jwtServise.verifyToken(token)
    if(user_id){
        ///????????????
            user_id
        ///????????????
        next()
    }
    else{
        res.sendStatus(401)
    }
}