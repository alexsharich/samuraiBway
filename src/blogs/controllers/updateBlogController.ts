import {Request} from 'express'
import {blogsRepository} from "../../repositories/blogs-repository";
import {InputBlogType} from "../../input-output-types/blog-types";

export const updateBlogController = async (req: Request<{ id: string }, {}, InputBlogType>, res: any) => {
    const isBlogUpdated = await blogsRepository.updateBlog({params: req.params.id, body: req.body})
    if (!isBlogUpdated) {
        res.sendStatus(404)
        return
    }

    const updatedBLog = await blogsRepository.findBlog(req.params.id)

    res.status(204).send(updatedBLog)
}
