import {NextFunction, Request, Response} from "express";
import {jwtServise} from "../application/jwtService";
import {authService} from "../auth/service/auth-service";


export const authRefreshMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken as string

    if (!refreshToken) {
        res.sendStatus(401)
        return
    }
    const token = jwtServise.verifyRefreshToken(refreshToken)
    if (!token) {
        res.sendStatus(401)
        return
    }
    const userId = token.userId
    const checkNewTokenInBlackList = await authService.checkTokenInBlackList(refreshToken)
    if (checkNewTokenInBlackList) {
        res.sendStatus(401)
        return
    }
    req.userId = userId
    next()
}