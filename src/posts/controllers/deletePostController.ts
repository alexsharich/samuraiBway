import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts-repository";

export const deletePostController = (req: Request<{ id: string }>, res: Response) => {
    const isDeletedPost = postsRepository.deletePost(req.params.id)
    if (!isDeletedPost) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
}