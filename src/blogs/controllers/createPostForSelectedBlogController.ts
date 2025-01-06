import {blogsService} from "../service/blogs-service";
import {Request, Response} from "express";
import {InputPostForBlogType} from "../../input-output-types/post-types";
import {postsQueryRepository} from "../../posts/repositories/post-query-repository";

export const createPostForSelectedBlogController = async (req: Request<{
    id: string
}, {}, InputPostForBlogType>, res: Response) => {
    const newPostCreated = await blogsService.createPostForSelectedBlog({blogId: req.params.id, body: req.body})
    if (newPostCreated === null) {
        res.sendStatus(407)
        return
    }
    const newPost = await postsQueryRepository.findPost(newPostCreated)
    if (!newPost) {
        res.sendStatus(406)
        return
    }
    res.status(201).json(newPost)
}