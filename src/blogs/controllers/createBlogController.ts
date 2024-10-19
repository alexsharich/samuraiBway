import {Request, Response} from "express";
import {InputBlogType} from "../../input-output-types/blog-types";
import {blogsService} from "../service/blogs-service";


export const createBlogController = async (req: Request<any, any, InputBlogType>, res: Response) => {
    const isNewBlogCreated = await blogsService.createBlog(req.body)

    if (isNewBlogCreated) {
        const newBlog = await blogsService.findBlog(isNewBlogCreated)
        if (newBlog) {
            res.status(201).json(newBlog)
            return
        }
    }

    res.sendStatus(404)
}