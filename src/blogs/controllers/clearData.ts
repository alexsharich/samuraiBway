import {Request, Response} from "express";
import {DB} from "../../db/db";

export const clearData = (req: Request, res: Response) => {
    DB.blogs = []
    DB.posts = []
    res.sendStatus(204)
}