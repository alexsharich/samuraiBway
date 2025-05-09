import {Request, Response} from "express";

export const logoutController = (req: Request, res: Response) => {
    const result = true // удалить токены
    if (!result) {
        res.status(401)
        return
    }
    res.status(204)
}