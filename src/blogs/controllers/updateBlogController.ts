import {Request} from 'express'
import {blogsRepository} from "../../repositories/blogs-repository";
import {InputBlogType} from "../../input-output-types/blog-types";

export const updateBlogController = (req: Request<{ id: string }, any, InputBlogType>, res: any) => {
    const isBolgUpdated = blogsRepository.updateBlog({params: req.params.id, body: req.body})
    if (isBolgUpdated) {
        res.status(204).send(isBolgUpdated)
        return
    }
    res.sendStatus(404)
}
