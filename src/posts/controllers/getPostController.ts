import {Request, Response} from 'express'
import {postsRepository} from "../../repositories/posts-repository";

export const getPostController = async (req: Request, res: Response) => {
    const posts = await postsRepository.getPosts()
    if (posts) {
        res.status(200).json(posts)
    }
}