import {CommentsRepository} from "../repositories/comments-repository";
import {CommentsQueryRepository} from "../repositories/comments-query-repository";
import {PostsService} from "../../posts/service/posts-service";
import {inject, injectable} from "inversify";
import {CommentDBType, CommentDocument, CommentModel, LikeStatus} from "../../db/comment-db-type";

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

    async updateLikeStatus(likeStatus: LikeStatus, commentId: string, userId: string) {
        return await this.commentsRepository.updateLikeStatus(likeStatus, commentId, userId)
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
        if (!comment) {
            return 'not found'
        }
        if (comment.commentatorInfo.userId === userId) {
            return await this.commentsRepository.updateComment(commentId, content)
        }
        return 'forbidden'
    }

    async createComment({userId, userLogin, postId, content}: any) {

        const existPost = await this.postsService.findPost(postId)
        if (existPost) {
            const newComment: CommentDocument = new CommentModel()
            newComment.commentatorInfo ={userId,userLogin}
            newComment.postId = existPost.id
            newComment.content = content
            const createdCommentId = await this.commentsRepository.save(newComment)
            if (createdCommentId) {
                return await this.commentsQueryRepository.findComment(createdCommentId,userId)
            }
        }
    }
}