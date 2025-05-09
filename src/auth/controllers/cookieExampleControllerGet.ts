import {Request, Response} from "express";

export const cookieExampleControllerGet = async (req: Request, res: Response) => {
    const meCookie = req.cookies.meCookie
    res.sendStatus(211)
}