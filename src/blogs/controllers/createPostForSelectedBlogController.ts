import {blogsService} from "../service/blogs-service";
import {Request, Response} from "express";
import {InputBlogType} from "../../input-output-types/blog-types";
import {postsService} from "../../posts/service/posts-service";

export const createPostForSelectedBlogController = async (req: Request<{
    id: string
}, {}, InputBlogType>, res: Response) => {
    const newPostCreated = await blogsService.createPostForSelectedBlog({blogId: req.params.id, body: req.body})
    if (newPostCreated === null) {
        res.sendStatus(400)
        return
    }
    const newPost = await postsService.findPost(newPostCreated.id.toString())
    if (!newPost) {
        res.sendStatus(400)
        return
    }
    res.status(201).json(newPost)
}