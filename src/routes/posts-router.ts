import {Router} from 'express'
import {getPostController} from '../posts/controllers/getPostController'
import {createPostController} from '../posts/controllers/createPostController'
import {findPostController} from '../posts/controllers/findPostController'
import {deletePostController} from '../posts/controllers/deletePostController'
import {updatePostController} from "../posts/controllers/updatePostController";
import {commentContentValidator, postValidators} from "../posts/middlewares/postValidators";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {createCommentForPostContrloller} from "../posts/controllers/createCommentForPostContrloller";
import {getCommentsForPostController} from "../posts/controllers/getCommentsForPostController";
import {authMiddleware} from "../global-middleware/auth-middleware";

export const postsRouter = Router()
postsRouter.get('/:id/comments',getCommentsForPostController)
postsRouter.post('/:id/comments',authMiddleware,...commentContentValidator,createCommentForPostContrloller)
postsRouter.get('/', getPostController)
postsRouter.post('/', ...postValidators, createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', adminMiddleware,deletePostController)
postsRouter.put('/:id',adminMiddleware,...postValidators, updatePostController)


