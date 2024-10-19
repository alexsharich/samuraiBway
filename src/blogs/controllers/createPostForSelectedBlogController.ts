import {blogsService} from "../service/blogs-service";
import {Request, Response} from "express";
import {InputBlogType} from "../../input-output-types/blog-types";
import {postsService} from "../../posts/service/posts-service";
import {InputPostForBlogType, InputPostType} from "../../input-output-types/post-types";

export const createPostForSelectedBlogController = async (req: Request<{
    id: string
}, {}, InputPostForBlogType>, res: Response) => {
    const newPostCreated = await blogsService.createPostForSelectedBlog({blogId: req.params.id, body: req.body})
    if (newPostCreated === null) {
        res.sendStatus(407)
        return
    }
    console.log('newPostCreated',newPostCreated)
    const newPost = await postsService.findPost(newPostCreated.toHexString())
    if (!newPost) {
        res.sendStatus(406)
        return
    }
    res.status(201).json(newPost)
}