import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs-repository";

export const deleteBlogController = (req: Request<{ id: string }>, res: Response) => {
    const isDeletedBlog = blogsRepository.deleteBlog(req.params.id)
    if (!isDeletedBlog) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
}