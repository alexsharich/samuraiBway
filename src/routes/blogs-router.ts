import {Router} from 'express'
import {getBlogController} from '../blogs/controllers/getBlogController'
import {createBlogController} from '../blogs/controllers/createBlogController'
import {findBlogController} from '../blogs/controllers/findBlogController'
import {deleteBlogController} from '../blogs/controllers/deleteBlogController'
import {updateBlogController} from "../blogs/controllers/updateBlogController";
import {blogValidators, findBlogValidator} from "../blogs/middlewares/blogValidators";
import {adminMiddleware} from "../global-middleware/admin-middleware";

export const blogsRouter = Router()

blogsRouter.get('/', getBlogController)
blogsRouter.post('/', ...blogValidators, createBlogController)
blogsRouter.get('/:id', findBlogValidator, findBlogController)
blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, deleteBlogController)
blogsRouter.put('/:id', findBlogValidator, ...blogValidators, updateBlogController)


