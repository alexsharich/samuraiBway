import {Request} from 'express'
import {postsRepository} from "../../repositories/posts-repository";
import {InputPostType} from "../../input-output-types/post-types";

export const updatePostController = (req: Request<{id:string},any,InputPostType>, res: any) => {
    const isPostUpdated = postsRepository.updatePost({params:req.params.id, body:req.body})
    if(isPostUpdated){
        res.sendStatus(201)
    }
    res.sendStatus(404)
}
