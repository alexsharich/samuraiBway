import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs-repository";

export const deleteBlogController =async (req: Request<{ id: string }>, res: Response) => {
    const isDeletedBlog =await  blogsRepository.deleteBlog(req.params.id)
    if (!isDeletedBlog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}