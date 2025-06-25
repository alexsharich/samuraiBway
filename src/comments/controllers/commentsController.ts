import {Request} from "express";
import {InputCommentType} from "../../input-output-types/comment-types";
import {CommentsService} from "../service/comments-service";
import {CommentsQueryRepository} from "../repositories/comments-query-repository";

export class CommentsController {
    constructor(private commentsService: CommentsService, private commentsQueryRepository: CommentsQueryRepository) {

    }

    async deleteComment(req: Request<{ commentId: string }>, res: any) {
        const userId = req.userId!
        const commentId = req.params.commentId

        const isDeletedComment = await this.commentsService.deleteComment(userId, commentId)
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

    async getComment(req: Request<{ id: string }>, res: any) {
        const comment = await this.commentsQueryRepository.findComment(req.params.id)
        if (!comment) {
            res.sendStatus(404)
            return
        }
        res.status(200).send(comment)
    }

    async updateComment(req: Request<{ commentId: string }, {}, InputCommentType>, res: any) {
        const userId = req.userId!
        const commentId = req.params.commentId
        const content = req.body.content


        const isСommentUpdated = await this.commentsService.updateComment(userId, commentId, content)
        if (isСommentUpdated === "not found") {
            res.sendStatus(404)
            return
        }
        if (isСommentUpdated === 'forbidden') {
            res.sendStatus(403)
            return
        }
        res.sendStatus(204)
    }
}