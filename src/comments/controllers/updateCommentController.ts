import {Request} from "express";
import {InputCommentType} from "../../input-output-types/comment-types";
import {commentsService} from "../service/comments-service";


export const updateCommentController = async (req: Request<{commentId:string}, {}, InputCommentType>, res: any) => {
    const isСommentUpdated = await commentsService.updateComment({params: req.params.commentId, body: req.body.content})
    if (!isСommentUpdated) {
        res.sendStatus(404)
        return
    }

    res.status(204)
}