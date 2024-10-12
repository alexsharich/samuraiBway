import {Request, Response} from 'express'
import {blogsRepository} from "../../repositories/blogs-repository";
import {OutputBlogType} from "../../input-output-types/blog-types";

export const getBlogController = async (req: Request, res: Response<OutputBlogType[]>) => {
    const blogs: OutputBlogType[] = await blogsRepository.getBlogs()
    if (blogs) {
        res.status(200).send(blogs)
    }
}