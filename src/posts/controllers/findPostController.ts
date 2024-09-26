import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts-repository";

export const findPostController = (req: Request<{id:string}>, res: Response) => {

    const foundPost = postsRepository.findPost(req.params.id )
    if(foundPost){
        res.status(200).json(foundPost)
        return;
    }
    res.sendStatus(404)
}