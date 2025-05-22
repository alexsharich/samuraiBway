import {Request, Response} from "express";
import {authService} from "../service/auth-service";
import {jwtServise} from "../../application/jwtService";
import {daysToMs} from "../../helpers/daysToMs";

export const refreshTokenController = async (req: Request, res: Response) => {
    const oldRefreshToken = req.cookies.refreshToken
    const userId = req.userId
    if (!userId) {
        res.sendStatus(401)
        return
    }

    await authService.addTokenToBlackList(oldRefreshToken)
    const {accessToken, refreshToken} = jwtServise.createToken(userId)
    res.cookie('refreshToken', refreshToken, {
        maxAge: (daysToMs(3)),
        httpOnly: true,
        secure: true
    })
    res.status(200).json({accessToken})

}