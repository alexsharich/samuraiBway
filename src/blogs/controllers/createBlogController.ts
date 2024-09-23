import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs-repository";
import {InputBlogType, OutputBlogType} from "../../input-output-types/blog-types";
import {OutputErrorsType} from "../../input-output-types/output-errors-type";


export const createBlogController = (req: Request<any, any, InputBlogType>, res:Response<OutputBlogType | OutputErrorsType>) => {
    const isNewBlogCreated = blogsRepository.createBlog(req.body)

    if(isNewBlogCreated){
        res.status(201).json(isNewBlogCreated)
    }
}