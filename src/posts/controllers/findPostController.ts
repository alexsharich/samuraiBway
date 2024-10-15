import {Request, Response} from "express";
import {ObjectId} from "mongodb";
import {postsService} from "../../domain/posts-service";

export const findPostController = async (req: Request<{ id: ObjectId }>, res: Response) => {
    const postId = new ObjectId(req.params.id)
    const foundPost = await postsService.findPost(postId.toString())
    if (!foundPost) {
        res.sendStatus(404)
        return;
    }
    res.status(200).json(foundPost)
}