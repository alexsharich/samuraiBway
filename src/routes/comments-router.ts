import {Router} from 'express'
import {authMiddleware} from "../global-middleware/auth-middleware";
import {commentContentValidator} from "../posts/middlewares/postValidators";
import {commentsController} from "../composition-root";

export const commentsRouter = Router()


commentsRouter.get('/:id', commentsController.getComment.bind(commentsController))
commentsRouter.delete('/:commentId', authMiddleware, commentsController.deleteComment.bind(commentsController))
commentsRouter.put('/:commentId', authMiddleware, ...commentContentValidator, commentsController.updateComment.bind(commentsController))


