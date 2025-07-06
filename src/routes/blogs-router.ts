import {Router} from 'express'
import {blogValidators, findBlogValidator} from "../blogs/middlewares/blogValidators";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {postForBlogValidator} from "../posts/middlewares/postValidators";
import {blogsController} from "../composition-root";

export const blogsRouter = Router()

blogsRouter.post('/', ...blogValidators, blogsController.createBlog.bind(blogsController))
blogsRouter.get('/', blogsController.getBlog.bind(blogsController))
blogsRouter.get('/:id', findBlogValidator, blogsController.findBlog.bind(blogsController))
blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, blogsController.deleteBlog.bind(blogsController))
blogsRouter.put('/:id', findBlogValidator, ...blogValidators, blogsController.updateBlog.bind(blogsController))
blogsRouter.post('/:id/posts', findBlogValidator, ...postForBlogValidator, blogsController.createPostForSelectedBlog.bind(blogsController))
blogsRouter.get('/:id/posts', blogsController.getPostsForSelectedBlog.bind(blogsController))


