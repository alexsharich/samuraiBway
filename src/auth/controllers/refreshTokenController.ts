import {Request, Response} from "express";
import {authService} from "../service/auth-service";
import {jwtServise} from "../../application/jwtService";
import {daysToMs} from "../../helpers/daysToMs";

export const refreshTokenController = async (req: Request, res: Response) => {
    /*Отправить рефрештокен в куки, и вернуть новую пару токенов, старый рефреш положить в черный лист*/
    const oldRefreshToken = req.cookies.refreshToken/* old refresh*/
    const userId = req.userId
    if (userId) {
        /*Добавить старые токены в черный лист бд*/
        const isOldTokenAdded = await authService.addTokenToBlackList(oldRefreshToken, userId)
        if (isOldTokenAdded) {
            const {accessToken, refreshToken} = jwtServise.createToken(userId)

            /*Добавить новый токен в бд*/

            /*Проверить нет ли новвых токенов в черном листе бд*/
            const checkNewTokenInBlackList = await authService.checkTokenInBlackList(refreshToken, userId)

            res.status(200).json({accessToken})
            res.cookie('refreshToken', refreshToken, {
                secure: true,
                sameSite: "strict",
                maxAge: (daysToMs(3)),
                httpOnly: true
            })
            return
        }

    }
    res.sendStatus(401)
}