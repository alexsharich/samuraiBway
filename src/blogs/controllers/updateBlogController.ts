import {Request} from 'express'
import {blogsRepository} from "../../repositories/blogs-repository";
import {InputBlogType} from "../../input-output-types/blog-types";

export const updateBlogController = (req: Request<{ id: string }, {}, InputBlogType>, res: any) => {
    const isBlogUpdated = blogsRepository.updateBlog({params: req.params.id, body: req.body})
    if (!isBlogUpdated) {
        res.sendStatus(404)
        return
    }
    res.status(204).send(isBlogUpdated)
}
