import {Router} from 'express'
import {commentContentValidator, postValidators} from "../posts/middlewares/postValidators";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {authMiddleware} from "../global-middleware/auth-middleware";
import {postsController} from "../composition-root";

export const postsRouter = Router()
postsRouter.get('/:id/comments', postsController.createCommentForPost)
postsRouter.post('/:id/comments', authMiddleware, ...commentContentValidator, postsController.createCommentForPost)
postsRouter.get('/', postsController.getPost)
postsRouter.post('/', ...postValidators, postsController.createPost)
postsRouter.get('/:id', postsController.findPost)
postsRouter.delete('/:id', adminMiddleware, postsController.deletePost)
postsRouter.put('/:id', adminMiddleware, ...postValidators, postsController.updatePost)


