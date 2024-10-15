import {Request, Response} from "express";
import {InputBlogType} from "../../input-output-types/blog-types";
import {blogsService} from "../../domain/blogs-service";


export const createBlogController = async (req: Request<any, any, InputBlogType>, res: any) => {
    const isNewBlogCreated = await blogsService.createBlog(req.body)

    if (isNewBlogCreated) {
        const newBlog = await blogsService.findBlog(isNewBlogCreated.id.toString())
        if (newBlog) {
            res.status(201).json(newBlog)
            return
        }
    }

    res.sendStatus(404)
}