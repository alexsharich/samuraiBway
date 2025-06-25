import {Router} from 'express'
import {authMiddleware} from "../global-middleware/auth-middleware";
import {commentContentValidator} from "../posts/middlewares/postValidators";
import {commentsController} from "../composition-root";

export const commentsRouter = Router()


commentsRouter.get('/:id', commentsController.getComment)
commentsRouter.delete('/:commentId', authMiddleware, commentsController.deleteComment)
commentsRouter.put('/:commentId', authMiddleware, ...commentContentValidator, commentsController.updateComment)


