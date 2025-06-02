import {Request} from "express";
import {commentsService} from "../service/comments-service";


export const deleteCommentController = async (req: Request<{ commentId: string }>, res: any) => {
    const userId = req.userId!
    const commentId = req.params.commentId

    const isDeletedComment = await commentsService.deleteComment(userId, commentId)
    if (isDeletedComment === "not found") {
        res.sendStatus(404)
        return
    }
    if (isDeletedComment === 'forbidden') {
        res.sendStatus(403)
        return
    }
    res.sendStatus(204)
}