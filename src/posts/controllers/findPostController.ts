import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts-repository";

export const findPostController = (req: Request<{id:string}>, res: Response) => {

    const foundPost = postsRepository.findPost(req.params.id ? req.params.id : null)
    if(foundPost){
        res.status(200).json(foundPost)
    }
    res.status(404)

}