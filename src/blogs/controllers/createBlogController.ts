import {Request, Response} from "express";
import {InputBlogType} from "../../input-output-types/blog-types";
import {blogsService} from "../service/blogs-service";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";


export const createBlogController = async (req: Request<any, any, InputBlogType>, res: Response) => {
    const isNewBlogCreated = await blogsService.createBlog(req.body)
    if (isNewBlogCreated) {
        const newBlog = await blogsQueryRepository.findBlog(isNewBlogCreated)
        if (newBlog) {
            res.status(201).json(newBlog)
            return
        }
    }

    res.sendStatus(404)
}