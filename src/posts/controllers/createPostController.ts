import {Request} from "express";
import {postsRepository} from "../../repositories/posts-repository";
import {InputPostType} from "../../input-output-types/post-types";


export const createPostController = (req: Request<any, any, InputPostType>, res: any) => {
    const newPostCreated = postsRepository.createPost(req.body)
    if (newPostCreated) {
        const newPost = postsRepository.findPost(newPostCreated)
        if (newPost) {
            res.status(201).json(newPost)
        }
    }
    res.sendStatus(404)
}