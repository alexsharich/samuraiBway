import {Request} from "express";
import {postsRepository} from "../../repositories/posts-repository";
import {InputPostType} from "../../input-output-types/post-types";


export const createPostController = (req: Request<any, any, InputPostType>, res: any) => {
    const isNewPostCreated = postsRepository.createPost(req.body)
    if (isNewPostCreated) {
        res.status(201).json(isNewPostCreated)
    }
}