import {Request, Response} from "express";
import {postsService} from "../service/posts-service";
import {blogsService} from "../../blogs/service/blogs-service";


export const clearData = async (req: Request, res: Response) => {
    await postsService.deleteAllPosts()
    await blogsService.deleteAllBlogs()
    res.sendStatus(204)
}