import {Request} from 'express'
import {postsRepository} from "../../repositories/posts-repository";
import {InputPostType} from "../../input-output-types/post-types";

export const updatePostController = async (req: Request<{ id: string }, any, InputPostType>, res: any) => {
    const isPostUpdated = await postsRepository.updatePost({params: req.params.id, body: req.body})
    if (isPostUpdated) {
        res.status(204).send(isPostUpdated)
        return
    }
    res.sendStatus(404)
}
