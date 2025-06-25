import {NextFunction, Request, Response} from "express";
import {jwtService} from "../composition-root";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers['authorization'];

    if (!auth) {
        res.sendStatus(401)
        return
    }
    const token = auth.split(' ')[1]
    const payload = jwtService.verifyToken(token)
    console.log(payload)
    if (!payload) {
        res.sendStatus(401)
        return
    }
    req.userId = payload!.userId
    next()
}