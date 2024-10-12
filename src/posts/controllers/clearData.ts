import {Request, Response} from "express";
import {postsRepository} from "../../repositories/posts-repository";
import {blogsRepository} from "../../repositories/blogs-repository";

export const clearData = async (req: Request, res: Response) => {
    await postsRepository.deleteAllPosts()
    await blogsRepository.deleteAllBlogs()
    res.sendStatus(204)
}