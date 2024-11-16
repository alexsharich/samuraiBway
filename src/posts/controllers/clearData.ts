import {Request, Response} from "express";
import {postsService} from "../service/posts-service";
import {blogsService} from "../../blogs/service/blogs-service";
import {usersService} from "../../users/service/users-service";
import {commentsService} from "../../comments/service/comments-service";


export const clearData = async (req: Request, res: Response) => {
    await postsService.deleteAllPosts()
    await blogsService.deleteAllBlogs()
    await usersService.deleteAllUsers()
    await commentsService.deleteAllComments()
    res.sendStatus(204)
}