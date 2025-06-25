import {Request, Response} from "express";

export const passwordRecoveryController = async (req: Request<{}, {}, { email: string }, {}>, res: Response) => {

    res.sendStatus(204)
}