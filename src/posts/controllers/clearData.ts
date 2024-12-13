import {Request, Response} from "express";
import {postsService} from "../service/posts-service";
import {blogsService} from "../../blogs/service/blogs-service";
import {usersService} from "../../users/service/users-service";
import {commentsService} from "../../comments/service/comments-service";
import {blogsCollection, commentsCollection, postsCollection, usersCollection} from "../../repositories/DB";


export const clearData = async (req: Request, res: Response) => {
    await postsCollection.deleteMany({})
    await blogsCollection.deleteMany({})
    return await usersCollection.drop()
    return await commentsCollection.drop()
    res.sendStatus(204)
}