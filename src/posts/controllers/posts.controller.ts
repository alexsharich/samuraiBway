import {Request, Response} from "express";
import {InputCommentType} from "../../input-output-types/comment-types";
import {InputPostType} from "../../input-output-types/post-types";
import {
    paginationQueries,
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
import {inject, injectable} from "inversify";

@injectable()
export class PostsController {
    constructor(@inject(PostsQueryRepository) private postsQueryRepository: PostsQueryRepository, @inject(UsersQueryRepository) private usersQueryRepository: UsersQueryRepository, @inject(PostsService) private postsService: PostsService, @inject(CommentsQueryRepository) private commentsQueryRepository: CommentsQueryRepository, @inject(CommentsService) private commentsService: CommentsService) {

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

        if (!newPostCreated) {
            res.sendStatus(404)
            return
        }
        const newPost = await this.postsQueryRepository.findPost(newPostCreated)
        res.status(201).json(newPost)
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


    async getPost(req: Request<{}, {}, {}, PaginationQueriesType>, res: Response) {
        const sortFilter = paginationQueries(req.query)
        const posts = await this.postsQueryRepository.getAllPosts(sortFilter)
        if (posts) { //TODO
            res.status(200).json(posts)
        }
    }

    async updatePost(req: Request<{ id: string }, any, InputPostType>, res: any) {
        const isPostUpdated = await this.postsService.updatePost({params: req.params.id, body: req.body})
        if (!isPostUpdated) {
            res.sendStatus(404)
            return
        }
        res.status(204).send(isPostUpdated)
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