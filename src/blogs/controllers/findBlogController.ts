import {Request, Response} from "express";
import {blogsService} from "../../domain/blogs-service";

export const findBlogController = async (req: Request<{ id: string }>, res: Response) => {
    const foundBlog = await blogsService.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundBlog)
}
