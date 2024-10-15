import {Request, Response} from 'express'
import {postsService} from "../../domain/posts-service";

export const getPostController = async (req: Request, res: Response) => {
    const posts = await postsService.getPosts()
    if (posts) {
        res.status(200).json(posts)
    }
}