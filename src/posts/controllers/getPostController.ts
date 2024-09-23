import {Request, Response} from 'express'
import {postsRepository} from "../../repositories/posts-repository";

export const getPostController = (req: Request, res: any) => {
    const posts = postsRepository.getPosts()
    if(posts){
        res.status(200).json(posts)
    }
}