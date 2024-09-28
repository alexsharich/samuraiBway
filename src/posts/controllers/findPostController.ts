import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts-repository";

export const findPostController = (req: Request<{id:string}>, res: Response) => {

    const foundPost = postsRepository.findPost(req.params.id )
    if(!foundPost){
        res.sendStatus(404)
        return;
    }
    res.status(200).json(foundPost)
}