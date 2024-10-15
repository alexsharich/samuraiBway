import {Request} from "express";
import {InputPostType} from "../../input-output-types/post-types";
import {postsService} from "../../domain/posts-service";


export const createPostController = async (req: Request<any, any, InputPostType>, res: any) => {
    const newPostCreated = await postsService.createPost(req.body)

    if (newPostCreated === null) {
        res.sendStatus(400)
        return
    }

    const newPost = await postsService.findPost(newPostCreated.toString())
    if (!newPost) {

        res.sendStatus(400)
        return
    }
    res.status(201).json(newPost)
}