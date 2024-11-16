import {Request} from "express";
import {commentsService} from "../service/comments-service";


export const deleteCommentController = async (req: Request<{commentId:string}>, res: any) => {
    const isDeletedComment = await commentsService.deleteComment(req.params.commentId)
    if (!isDeletedComment) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
}