import {Request} from "express";
import {postsRepository} from "../../repositories/posts-repository";
import {InputPostType} from "../../input-output-types/post-types";


export const createPostController = (req: Request<any, any, InputPostType>, res: any) => {
    const newPostCreated = postsRepository.createPost(req.body)

    const newPost = postsRepository.findPost(newPostCreated)
    if (!newPost) {

        res.sendStatus(700) //падает здесь
        return
    }
    res.status(201).json(newPost)
}