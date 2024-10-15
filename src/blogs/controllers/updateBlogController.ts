import {Request} from 'express'
import {InputBlogType} from "../../input-output-types/blog-types";
import {blogsService} from "../../domain/blogs-service";

export const updateBlogController = async (req: Request<{ id: string }, {}, InputBlogType>, res: any) => {
    const isBlogUpdated = await blogsService.updateBlog({params: req.params.id, body: req.body})
    if (!isBlogUpdated) {
        res.sendStatus(404)
        return
    }

    const updatedBLog = await blogsService.findBlog(req.params.id)

    res.status(204).send(updatedBLog)
}
