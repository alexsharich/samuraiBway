import {Request, Response} from "express";
import {postsService} from "../../domain/posts-service";

export const deletePostController = async (req: Request<{ id: string }>, res: Response) => {
    const isDeletedPost = await postsService.deletePost(req.params.id)
    if (!isDeletedPost) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}