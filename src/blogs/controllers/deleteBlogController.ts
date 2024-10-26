import {Request, Response} from "express";
import {blogsService} from "../service/blogs-service";

export const deleteBlogController = async (req: Request<{ id: string }>, res: Response) => {
    const isDeletedBlog = await blogsService.deleteBlog(req.params.id)
    if (!isDeletedBlog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}