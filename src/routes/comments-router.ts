import {Router} from 'express'
import {findPostController} from '../posts/controllers/findPostController'
import {deleteCommentController} from "../comments/controllers/deleteCommentController";
import {updateCommentController} from "../comments/controllers/updateCommentController";

export const commentsRouter = Router()


commentsRouter.get('/:id', findPostController)
commentsRouter.delete('/:commentId',deleteCommentController)
commentsRouter.put('/:commentId', updateCommentController)


