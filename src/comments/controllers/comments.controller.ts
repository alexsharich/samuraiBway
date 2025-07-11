import {Request} from "express";
import {InputCommentType} from "../../input-output-types/comment-types";
import {CommentsService} from "../service/comments-service";
import {CommentsQueryRepository} from "../repositories/comments-query-repository";
import {inject, injectable} from "inversify";

@injectable()
export class CommentsController {
    constructor(@inject(CommentsService) private commentsService: CommentsService, @inject(CommentsQueryRepository) private commentsQueryRepository: CommentsQueryRepository) {

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


        const isCommentUpdated = await this.commentsService.updateComment(userId, commentId, content)
        if (isCommentUpdated === "not found") {
            res.sendStatus(404)
            return
        }
        if (isCommentUpdated === 'forbidden') {
            res.sendStatus(403)
            return
        }
        res.sendStatus(204)
    }
}