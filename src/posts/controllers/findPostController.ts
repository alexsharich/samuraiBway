import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts-repository";
import {ObjectId} from "mongodb";

export const findPostController = async (req: Request<{ id: ObjectId }>, res: Response) => {
    const postId = new ObjectId(req.params.id)
    const foundPost = await postsRepository.findPost(postId.toString())
    if (!foundPost) {
        res.sendStatus(404)
        return;
    }
    res.status(200).json(foundPost)
}