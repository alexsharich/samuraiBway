import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs-repository";
import {InputBlogType} from "../../input-output-types/blog-types";


export const createBlogController =  (req: Request<any, any, InputBlogType>, res:any) => {
    const isNewBlogCreated =  blogsRepository.createBlog(req.body)

    if (isNewBlogCreated) {
        const newBlog =  blogsRepository.findBlog(isNewBlogCreated)
        if (newBlog) {
            res.status(201).json(newBlog)
        }
    }
}