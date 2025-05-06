import {Request, Response} from "express";
import {blogsCollection, commentsCollection, postsCollection, usersCollection} from "../../repositories/DB";


export const clearData = async (req: Request, res: Response) => {
    await postsCollection.deleteMany({})
    await blogsCollection.deleteMany({})
    await usersCollection.drop()
    await commentsCollection.drop()
    res.sendStatus(204)
}