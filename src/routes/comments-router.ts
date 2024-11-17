import {Router} from 'express'
import {deleteCommentController} from "../comments/controllers/deleteCommentController";
import {updateCommentController} from "../comments/controllers/updateCommentController";
import {getCommentController} from "../comments/controllers/getCommentController";
import {authMiddleware} from "../global-middleware/auth-middleware";
import {commentContentValidator} from "../posts/middlewares/postValidators";

export const commentsRouter = Router()


commentsRouter.get('/:id', getCommentController)
commentsRouter.delete('/:commentId',authMiddleware,deleteCommentController)
commentsRouter.put('/:commentId',authMiddleware,...commentContentValidator, updateCommentController)


