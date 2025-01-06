import {Request} from 'express'
import {InputPostType} from "../../input-output-types/post-types";
import {postsService} from "../service/posts-service";

export const updatePostController = async (req: Request<{ id: string }, any, InputPostType>, res: any) => {
    const isPostUpdated = await postsService.updatePost({params: req.params.id, body: req.body})
    if (isPostUpdated) {
        res.status(204).send(isPostUpdated)
        return
    }
    res.sendStatus(404)
}
