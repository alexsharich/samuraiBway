import {Request, Response} from "express";
import {DB} from "../../db/db";

export const clearData = (req: Request, res: Response) => {
    DB.posts = []
    DB.blogs = []
    res.send(204).json({})
}