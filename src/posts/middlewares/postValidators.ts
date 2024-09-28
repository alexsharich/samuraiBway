import {body, param} from 'express-validator'
import {NextFunction, Request, Response} from 'express'
import {adminMiddleware} from "../../global-middleware/admin-middleware";
import {inputCheckErrorsMiddleware} from "../../global-middleware/inputCheckErrorsMiddleware";
import {postsRepository} from "../../repositories/posts-repository";
import {blogsRepository} from "../../repositories/blogs-repository";

export const titleValidator = body('title').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 30}).withMessage('more then 30 or 0')
export const shortDescriptionValidator = body('shortDescription').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 100}).withMessage('more then 100 or 0')
export const contentValidator = body('content').isString().withMessage('not string')
    .trim().isLength({min: 1, max: 1000}).withMessage('more then 1000 or 0')
export const blogIdValidator = body('blogId').isString().withMessage('not string')
    .trim().custom(blogId => {
        const blog = blogsRepository.findBlog(blogId)
        return !!blog
    }).withMessage('no blog')
export const findPostValidator = (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const post = postsRepository.findPost(req.params.id)
    if (!post) {

        res
            .status(404)
            .json({})
        return
    }

    next()
}

export const postValidators = [
    adminMiddleware,

    titleValidator,
    shortDescriptionValidator,
    contentValidator,
    blogIdValidator,

    inputCheckErrorsMiddleware,
]