import {Request, Response} from "express";
import {postsService} from "../../domain/posts-service";
import {blogsService} from "../../domain/blogs-service";


export const clearData = async (req: Request, res: Response) => {
    await postsService.deleteAllPosts()
    await blogsService.deleteAllBlogs()
    res.sendStatus(204)
}