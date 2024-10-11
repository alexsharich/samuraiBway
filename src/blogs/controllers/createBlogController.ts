import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs-repository";
import {InputBlogType} from "../../input-output-types/blog-types";


export const createBlogController = async (req: Request<any, any, InputBlogType>, res: any) => {
    const isNewBlogCreated =await blogsRepository.createBlog(req.body)

    const newBlog =await blogsRepository.findBlog(isNewBlogCreated)
    if (newBlog) {
        res.status(201).json(newBlog)
        return
    }
    res.sendStatus(404)
}