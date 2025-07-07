import {CommentsRepository} from "../repositories/comments-repository";
import {CommentsQueryRepository} from "../repositories/comments-query-repository";
import {PostsService} from "../../posts/service/posts-service";
import {inject, injectable} from "inversify";

export type CommentType = {
    postId: "string",
    content: "string",
    commentatorInfo: {
        userId: "string",
        userLogin: "string"
    },
    createdAt: string
}

@injectable()
export class CommentsService {

    constructor(@inject(CommentsRepository) private commentsRepository: CommentsRepository, @inject(CommentsQueryRepository) private commentsQueryRepository: CommentsQueryRepository, @inject(PostsService) private postsService: PostsService) {

    }

    async deleteComment(userId: string, commentId: string) {
        const comment = await this.commentsRepository.findById(commentId)
        if (!comment) {
            return 'not found'
        }
        if (comment?.commentatorInfo.userId === userId) {
            return await this.commentsRepository.deleteComment(commentId)
        }
        return 'forbidden'
    }

    async updateComment(userId: string, commentId: string, content: string) {
        const comment = await this.commentsRepository.findById(commentId)
        console.log('COMMENT :', comment)
        if (!comment) {
            return 'not found'
        }
        if (comment.commentatorInfo.userId === userId) {
            return await this.commentsRepository.updateComment(commentId, content)
        }
        return 'forbidden'
    }

    async createComment({userId, userLogin, postId, comment}: any) {

        const existPost = await this.postsService.findPost(postId)
        if (existPost) {
            const newComment: CommentType = {
                postId,
                content: comment,
                commentatorInfo: {
                    userId,
                    userLogin
                },
                createdAt: (new Date().toISOString())
            }
            const createdCommentId = await this.commentsRepository.createComment(newComment)
            if (createdCommentId) {
                return await this.commentsQueryRepository.findComment(createdCommentId)
            }
        }
    }
}