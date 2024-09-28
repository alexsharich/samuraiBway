import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs-repository";

export const findBlogController = (req: Request<{ id: string }>, res: Response) => {
    const foundBlog = blogsRepository.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundBlog)
}
