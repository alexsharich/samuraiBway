import {Request} from "express";
import {postsRepository} from "../../repositories/posts-repository";
import {InputPostType} from "../../input-output-types/post-types";


export const createPostController = async (req: Request<any, any, InputPostType>, res: any) => {
    const newPostCreated = await postsRepository.createPost(req.body)

    if (newPostCreated === null) {
        res.sendStatus(400)
        return
    }

    const newPost = await postsRepository.findPost(newPostCreated.toString())
    if (!newPost) {

        res.sendStatus(400)
        return
    }
    res.status(201).json(newPost)
}