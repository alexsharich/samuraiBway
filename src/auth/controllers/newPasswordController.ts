import {Request, Response} from "express";

export const newPasswordController = async (req: Request<{}, {}, {
    newPassword: string,
    recoveryCode: string
}>, res: Response) => {

}