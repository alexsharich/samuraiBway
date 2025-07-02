import {Request, Response} from "express";
import {InputBlogType} from "../../input-output-types/blog-types";
import {InputPostForBlogType} from "../../input-output-types/post-types";
import {MapToOutputWithPagination, PostsQueryRepository} from "../../posts/repositories/post-query-repository";
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination_values";
import {BlogsService} from "../service/blogs-service";
import {BlogsQueryRepository} from "../repositories/blogs-query-repository";

export class BlogsController {
    constructor(private blogsService: BlogsService, private blogsQueryRepository: BlogsQueryRepository, private postsQueryRepository: PostsQueryRepository) {

    }

    async createBlog(req: Request<any, any, InputBlogType>, res: Response) {
        const isNewBlogCreated = await this.blogsService.createBlog(req.body)
        if (isNewBlogCreated) {
            const newBlog = await this.blogsQueryRepository.findBlog(isNewBlogCreated)
            if (newBlog) {
                res.status(201).json(newBlog)
                return
            }
        }
        res.sendStatus(404)
    }

    async createPostForSelectedBlog(req: Request<{
        id: string
    }, {}, InputPostForBlogType>, res: Response) {
        const newPostCreated = await this.blogsService.createPostForSelectedBlog({
            blogId: req.params.id,
            body: req.body
        })
        if (newPostCreated === null) {
            res.sendStatus(407)
            return
        }
        const newPost = await this.postsQueryRepository.findPost(newPostCreated)
        if (!newPost) {
            res.sendStatus(406)
            return
        }
        res.status(201).json(newPost)
    }

    async deleteBlog(req: Request<{ id: string }>, res: Response) {
        const isDeletedBlog = await this.blogsService.deleteBlog(req.params.id)
        if (!isDeletedBlog) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }

    async findBlog(req: Request<{ id: string }>, res: Response) {
        const foundBlog = await this.blogsQueryRepository.findBlog(req.params.id)
        if (!foundBlog) {
            res.sendStatus(404)
            return
        }
        res.status(200).send(foundBlog)
    }

    async getBlog(req: Request<{}, {}, {}, PaginationQueriesType>, res: Response<MapToOutputWithPagination>) {
        const sortFilter = paginationQueries(req.query)
        const blogs = await this.blogsQueryRepository.getBlogs(sortFilter)
        if (blogs) { // TODO
            res.status(200).send(blogs)
        }
    }

    async getPostsForSelectedBlog(req: Request<{
        id: string
    }, {}, {}, PaginationQueriesType>, res: Response) {

        const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = paginationQueries(req.query)
        const blogId: string = req.params.id
        const blog = await this.blogsQueryRepository.findBlog(blogId)
        if (!blog) {
            res.sendStatus(404)
            return
        }
        const posts = await this.postsQueryRepository.getPostsForSelectedBlog({
            blogId,
            query: {pageSize, pageNumber, sortDirection, sortBy, searchNameTerm}
        })


        if (!posts) {
            res.sendStatus(404)
            return
        }
        res.status(200).send(posts)
    }

    async updateBlog(req: Request<{ id: string }, {}, InputBlogType>, res: any) {
        const isBlogUpdated = await this.blogsService.updateBlog({params: req.params.id, body: req.body})
        if (!isBlogUpdated) {
            res.sendStatus(404)
            return
        }

        const updatedBLog = await this.blogsQueryRepository.findBlog(req.params.id)

        res.status(204).send(updatedBLog)
    }
}