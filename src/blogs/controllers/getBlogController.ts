import {Request, Response} from 'express'
import {blogsRepository} from "../../repositories/blogs-repository";
import {BlogDBType} from "../../db/blog-db-type";

export const getBlogController = async (req: Request, res: Response<BlogDBType[]>) => {
    const blogs: BlogDBType[] = await blogsRepository.getBlogs()
    if (blogs) {
        res.status(200).send(blogs)
    }
}