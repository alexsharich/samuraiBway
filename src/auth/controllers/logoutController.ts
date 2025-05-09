import {Request, Response} from "express";

export const logoutController = (req: Request, res: Response) => {
    /*Отметить рефреш токен как невалидный(токен приходит в куки)*/
    res.status(204)
    res.status(401)
}