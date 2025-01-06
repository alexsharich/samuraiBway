import {Request, Response} from "express";
import {postsQueryRepository} from "../repositories/post-query-repository";

export const findPostController = async (req: Request<{ id: string }>, res: Response) => {
    const foundPost = await postsQueryRepository.findPost(req.params.id)
    if (!foundPost) {
        res.sendStatus(404)
        return;
    }
    res.status(200).json(foundPost)
}