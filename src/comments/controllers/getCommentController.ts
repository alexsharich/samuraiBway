import {Request} from "express";
import {commentsQueryRepository} from "../repositories/comments-query-repository";


export const getCommentController = async (req: Request<{ id: string }>, res: any) => {
    const comment = await commentsQueryRepository.findComment(req.params.id)
    if (!comment) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(comment)
}