import {Router} from 'express'
import {getPostController} from '../posts/controllers/getPostController'
import {createPostController} from '../posts/controllers/createPostController'
import {findPostController} from '../posts/controllers/findPostController'
import {deletePostController} from '../posts/controllers/deletePostController'
import {updatePostController} from "../posts/controllers/updatePostController";
import {findPostValidator, postValidators} from "../posts/middlewares/postValidators";
import {adminMiddleware} from "../global-middleware/admin-middleware";

export const postsRouter = Router()

postsRouter.get('/', getPostController)
postsRouter.post('/', ...postValidators, createPostController)
postsRouter.get('/:id', findPostController)
postsRouter.delete('/:id', deletePostController)
postsRouter.put('/:id', updatePostController)


