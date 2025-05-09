import {Request, Response} from "express";

export const refreshTokenController = (req: Request, res: Response) => {
    /*Отправить рефрештокен в куки, и вернуть новую пару токенов*/
    res.status(200).send({/*accessToken*/})
    res.sendStatus(401)
}