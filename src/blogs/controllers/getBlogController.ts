import {Request, Response} from 'express'
import {OutputBlogType} from "../../input-output-types/blog-types";
import {blogsService} from "../service/blogs-service";

export const getBlogController = async (req: Request, res: Response<OutputBlogType[]>) => {
    const blogs: OutputBlogType[] = await blogsService.getBlogs()
    if (blogs) {
        res.status(200).send(blogs)
    }
}