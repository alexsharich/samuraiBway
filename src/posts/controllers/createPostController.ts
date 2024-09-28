import {Request} from "express";
import {postsRepository} from "../../repositories/posts-repository";
import {InputPostType} from "../../input-output-types/post-types";


export const createPostController = (req: Request<any, any, InputPostType>, res: any) => {
    const newPostCreated = postsRepository.createPost(req.body)
    if (newPostCreated) {
        const newPost = postsRepository.findPost(newPostCreated.id)
        if (!newPost) {
            res.sendStatus(404)
            return
        }
        res.status(201).json(newPost)
    }

}