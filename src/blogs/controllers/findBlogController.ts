import {Request, Response} from "express";
import {blogsService} from "../service/blogs-service";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";

export const findBlogController = async (req: Request<{ id: string }>, res: Response) => {
    const foundBlog = await blogsQueryRepository.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundBlog)
}
