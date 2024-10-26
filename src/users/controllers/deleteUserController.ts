import {Request, Response} from "express";
import {usersService} from "../service/users-service";

export const deleteUserController = async (req: Request<{id:string}>, res: Response) => {
    const isDeleted = await usersService.deleteUser(req.params.id)
    if (!isDeleted) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}