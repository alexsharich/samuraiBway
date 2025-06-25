import {Router} from 'express'
import {blogValidators, findBlogValidator} from "../blogs/middlewares/blogValidators";
import {adminMiddleware} from "../global-middleware/admin-middleware";
import {postForBlogValidator} from "../posts/middlewares/postValidators";
import {blogsController} from "../composition-root";

export const blogsRouter = Router()

blogsRouter.post('/', ...blogValidators, blogsController.createBlog)
blogsRouter.get('/', blogsController.getBlog)
blogsRouter.get('/:id', findBlogValidator, blogsController.findBlog)
blogsRouter.delete('/:id', adminMiddleware, findBlogValidator, blogsController.deleteBlog)
blogsRouter.put('/:id', findBlogValidator, ...blogValidators, blogsController.updateBlog)
blogsRouter.post('/:id/posts', findBlogValidator, ...postForBlogValidator, blogsController.createPostForSelectedBlog)
blogsRouter.get('/:id/posts', blogsController.getPostsForSelectedBlog)


