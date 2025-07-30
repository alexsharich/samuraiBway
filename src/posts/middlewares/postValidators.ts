import {body, param} from 'express-validator'
import {NextFunction, Request, Response} from 'express'
import {adminMiddleware} from "../../global-middleware/admin-middleware";
import {inputCheckErrorsMiddleware} from "../../global-middleware/inputCheckErrorsMiddleware";
import {container} from "../../composition-root";
import {PostsQueryRepository} from "../repositories/post-query-repository";
import {BlogsQueryRepository} from "../../blogs/repositories/blogs-query-repository";
import {LikeStatus} from "../../db/comment-db-type";

const blogsQueryRepository = container.get(BlogsQueryRepository)
const postsQueryRepository = container.get(PostsQueryRepository)

const validStatuses: LikeStatus[] = ['None', 'Like', 'Dislike'] as const;

export const titleValidator = body('title').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 30}).withMessage('more then 30 or 0')
export const shortDescriptionValidator = body('shortDescription').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('more then 100 or 0')
export const contentValidator = body('content').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('more then 1000 or 0')
export const blogIdValidator = body('blogId').isString().withMessage('not string')
    .trim().custom(async (blogId: string) => {
        const blog = await blogsQueryRepository.findBlog(blogId)
        if (!blog) {
            throw new Error('blog not found !')
        }
        return true
    }).withMessage('no blog')

export const blogIdInParamsValidator = param('id').isString().withMessage('not string')
    .trim().custom(async (blogId: string) => {
        const blog = await blogsQueryRepository.findBlog(blogId)
        if (!blog) {
            throw new Error('blog not found !')
        }
        return true
    }).withMessage('no blog')

export const findPostValidator = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const post = postsQueryRepository.findPost(req.params.id)
    if (!post) {

        res
            .status(404)
            .json({})
        return
    }

    next()
}

export const likeStatusValidator = body('likeStatus').isIn(validStatuses).isString().withMessage('incorrect status')
export const contentForCommentValidator = body('content').isString().withMessage('not string')
    .trim().isLength({min: 20, max: 300}).withMessage('more then 300 or min 20')
export const postValidators = [
    adminMiddleware,

    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware,
]
export const postForBlogValidator = [
    adminMiddleware,

    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdInParamsValidator,

    inputCheckErrorsMiddleware,
]

export const checklikeValidator = [
    likeStatusValidator,
    inputCheckErrorsMiddleware
]

export const commentContentValidator = [
    contentForCommentValidator,

    inputCheckErrorsMiddleware,
]