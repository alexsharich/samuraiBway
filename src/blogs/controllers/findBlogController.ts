import {Request, Response} from "express";
import {blogsRepository} from "../../repositories/blogs-repository";

export const findBlogController = (req: Request<{id:string}>, res: Response) => {
    const foundBlog = blogsRepository.findBlog(req.params.id)
    if(foundBlog){
        res.status(200).send(foundBlog)
        return
    }
    res.sendStatus(404)
}