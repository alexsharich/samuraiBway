import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts-repository";

export const deletePostController = async (req: Request<{ id: string }>, res: Response) => {
    const isDeletedPost = await postsRepository.deletePost(req.params.id)
    if (!isDeletedPost) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}