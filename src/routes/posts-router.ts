import {Router} from 'express'
import {commentContentValidator, postValidators} from "../posts/middlewares/postValidators";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {authMiddleware} from "../global-middleware/auth-middleware";
import {container} from "../composition-root";
import {PostsController} from "../posts/controllers/posts.controller";

const postsController = container.get(PostsController)
export const postsRouter = Router()
postsRouter.get('/:id/comments', postsController.createCommentForPost.bind(postsController))
postsRouter.post('/:id/comments', authMiddleware, ...commentContentValidator, postsController.createCommentForPost.bind(postsController))
postsRouter.get('/', postsController.getPost.bind(postsController))
postsRouter.post('/', ...postValidators, postsController.createPost.bind(postsController))
postsRouter.get('/:id', postsController.findPost)
postsRouter.delete('/:id', adminMiddleware, postsController.deletePost.bind(postsController))
postsRouter.put('/:id', adminMiddleware, ...postValidators, postsController.updatePost.bind(postsController))


