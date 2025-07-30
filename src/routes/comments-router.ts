import {Router} from 'express'
import {authMiddleware} from "../global-middleware/auth-middleware";
import {checklikeValidator, commentContentValidator, likeStatusValidator} from "../posts/middlewares/postValidators";
import {container} from "../composition-root";
import {CommentsController} from "../comments/controllers/comments.controller";
import {userIdentificationMiddleware} from "../posts/middlewares/userIdentificationMiddleware";

const commentsController = container.get(CommentsController)
export const commentsRouter = Router()


commentsRouter.put('/:commentId/like-status', authMiddleware, ...checklikeValidator, commentsController.updateCommentLikeStatus.bind(commentsController))//TODO
commentsRouter.get('/:id', userIdentificationMiddleware, commentsController.getComment.bind(commentsController))
commentsRouter.delete('/:commentId', authMiddleware, commentsController.deleteComment.bind(commentsController))
commentsRouter.put('/:commentId', authMiddleware, ...commentContentValidator, commentsController.updateComment.bind(commentsController)) //TODO


