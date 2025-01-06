import {Request} from "express";
import {InputPostType} from "../../input-output-types/post-types";
import {postsService} from "../service/posts-service";
import {postsQueryRepository} from "../repositories/post-query-repository";


export const createPostController = async (req: Request<any, any, InputPostType>, res: any) => {
    const newPostCreated = await postsService.createPost(req.body)

    if (newPostCreated) {
        const newPost = await postsQueryRepository.findPost(newPostCreated)
        res.status(201).json(newPost)
        return
    }
    res.sendStatus(404)
}