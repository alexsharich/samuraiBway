import {NextFunction,Request,Response} from "express";
import {jwtServise} from "../application/jwtService";


export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{
const auth = req.headers['authorization'];
if(!auth){
    res.sendStatus(401)
    return
}
const token = auth.split(' ')[1]
    const userId =  jwtServise.verifyToken(token)
    if(userId){
        req.userId = userId.userId
        next()
    }
    else{
        res.sendStatus(401)
    }
}