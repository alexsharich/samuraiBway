import {Request, Response} from "express";
import {postsService} from "../service/posts-service";

export const findPostController = async (req: Request<{ id: string }>, res: Response) => {
    const foundPost = await postsService.findPost(req.params.id)
    if (!foundPost) {
        res.sendStatus(404)
        return;
    }
    res.status(200).json(foundPost)
}