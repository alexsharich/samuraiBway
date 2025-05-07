import {authService} from "../service/auth-service";
import {Request, Response} from "express";

export const registrationConfirmationController = async (req: Request, res: Response) => {
    const result = await authService.confirmEmail(req.body.code)
    if (!result) {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "invalid code",
                    "field": "code"
                }
            ]
        })
        return
    } else {
        res.status(204).send()
    }
}