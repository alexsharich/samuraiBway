import {Request, Response} from "express";
import {DB} from "../../db/db";
import {postsRepository} from "../../repositories/posts-repository";
import {blogsRepository} from "../../repositories/blogs-repository";

export const clearData = async (req: Request, res: Response) => {
    // DB.posts = []
    // DB.blogs = []
        await postsRepository.deleteAllPosts()
        await blogsRepository.deleteAllBlogs()
    res.send(204).json({})
}