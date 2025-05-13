import {Request, Response} from "express";
import {authService} from "../service/auth-service";

export const logoutController = async (req: Request, res: Response) => {
    const userId = req.userId
    const refreshToken = req.cookies.refreshToken
    const isAddToBlackList = await authService.addTokenToBlackList(refreshToken, userId!)
    if (!isAddToBlackList) {
        res.status(401)
        return
    }
    res.clearCookie('refreshToken')
    res.status(204)
}