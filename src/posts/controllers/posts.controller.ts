import {Request, Response} from "express";
import {InputCommentType} from "../../input-output-types/comment-types";
import {InputPostType} from "../../input-output-types/post-types";
import {
    paginationQueries,
    paginationQueriesComment,
    PaginationQueriesCommentType,
    PaginationQueriesType
} from "../../helpers/pagination_values";
import {
    blogsCollection,
    commentsCollection,
    devicesCollection,
    postsCollection,
    usersCollection
} from "../../repositories/DB";
import {PostsQueryRepository} from "../repositories/post-query-repository";
import {PostsService} from "../service/posts-service";
import {UsersQueryRepository} from "../../users/repositories/users-query-repository";
import {CommentsQueryRepository} from "../../comments/repositories/comments-query-repository";
import {CommentsService} from "../../comments/service/comments-service";

export class PostsController {
    constructor(private postsQueryRepository: PostsQueryRepository, private usersQueryRepository: UsersQueryRepository, private postsService: PostsService, private commentsQueryRepository: CommentsQueryRepository, private commentsService: CommentsService) {

    }

    async createCommentForPost(req: Request<{
        id: string
    }, any, InputCommentType>, res: any) {
        const userId = req.userId
        const isPostExist = await this.postsQueryRepository.findPost(req.params.id)
        if (!isPostExist) {
            res.sendStatus(404)
            return
        }
        if (userId) {
            const user = await this.usersQueryRepository.findUser(userId)
            if (user !== null) {
                const createdComment = await this.commentsService.createComment({
                    userId: userId,
                    userLogin: user.login,
                    postId: req.params.id,
                    comment: req.body.content
                })
                if (createdComment) {
                    res.status(201).send(createdComment)
                    return
                }
            }
        }
    }

    async createPost(req: Request<any, any, InputPostType>, res: any) {
        const newPostCreated = await this.postsService.createPost(req.body)

        if (newPostCreated) {
            const newPost = await this.postsQueryRepository.findPost(newPostCreated)
            res.status(201).json(newPost)
            return
        }
        res.sendStatus(404)
    }

    async deletePost(req: Request<{ id: string }>, res: Response) {
        const isDeletedPost = await this.postsService.deletePost(req.params.id)
        if (!isDeletedPost) {
            res.sendStatus(404)
            return
        }
        res.sendStatus(204)
    }

    async findPost(req: Request<{ id: string }>, res: Response) {
        const foundPost = await this.postsQueryRepository.findPost(req.params.id)
        if (!foundPost) {
            res.sendStatus(404)
            return;
        }
        res.status(200).json(foundPost)
    }

    async getCommentsForPost(req: Request<{ id: string }, {}, {}, PaginationQueriesCommentType>, res: any) {
        const postId = req.params.id
        const isPostExist = await this.postsQueryRepository.findPost(postId)
        if (!isPostExist) {
            res.sendStatus(404)
            return
        }
        const sortFilter = paginationQueriesComment(req.query)
        const posts = await this.commentsQueryRepository.getComments(sortFilter, postId)
        if (posts) {
            res.status(200).json(posts)
            return
        }
    }

    async getPost(req: Request<{}, {}, {}, PaginationQueriesType>, res: Response) {
        const sortFilter = paginationQueries(req.query)
        const posts = await this.postsQueryRepository.getAllPosts(sortFilter)
        if (posts) {
            res.status(200).json(posts)
        }
    }

    async updatePost(req: Request<{ id: string }, any, InputPostType>, res: any) {
        const isPostUpdated = await this.postsService.updatePost({params: req.params.id, body: req.body})
        if (isPostUpdated) {
            res.status(204).send(isPostUpdated)
            return
        }
        res.sendStatus(404)
    }

    async clearData(req: Request, res: Response) {
        await postsCollection.deleteMany({})
        await blogsCollection.deleteMany({})
        await usersCollection.drop()
        await commentsCollection.drop()
        await devicesCollection.drop()
        res.sendStatus(204)
    }
}