import {Request, Response} from 'express'
import {blogsRepository} from "../../repositories/blogs-repository";
import {BlogDBType} from "../../db/blog-db-type";

export const getBlogController = (req: Request, res: Response<BlogDBType[]>) => {
    const blogs = blogsRepository.getBlogs()
    res.status(200).send(blogs)
}