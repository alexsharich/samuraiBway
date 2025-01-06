import {commentsRepository} from "../repositories/comments-repository";
import {commentsCollection, usersCollection} from "../../repositories/DB";
import {postsService, PostType} from "../../posts/service/posts-service";
import {commentsQueryRepository} from "../repositories/comments-query-repository";
import {postsRepository} from "../../posts/repositories/posts-repository";

export type CommentType = {
    postId: "string",
    content: "string",
    commentatorInfo: {
        userId: "string",
        userLogin: "string"
    },
    createdAt: string
}

export const commentsService = {
    async deleteComment(userId: string, commentId: string) {
        const comment = await commentsRepository.findById(commentId)
        if (!comment) {
            return 'not found'
        }
        if (comment?.commentatorInfo.userId === userId) {
            return await commentsRepository.deleteComment(commentId)
        }
        return 'forbidden'
    },
    async updateComment(userId: string, commentId: string, content: string) {
        const comment = await commentsRepository.findById(commentId)
        console.log('COMMENT :',comment)
        if (!comment) {
            return 'not found'
        }
        if (comment.commentatorInfo.userId === userId) {
            return await commentsRepository.updateComment(commentId, content)
        }
        return 'forbidden'
    },
    async createComment({userId, userLogin, postId, comment}: any) {

        const existPost = await postsService.findPost(postId)
        if (existPost) {
            const newComment: CommentType = {
                postId,////////  ????
                content: comment,
                commentatorInfo: {
                    userId,
                    userLogin
                },
                createdAt: (new Date().toISOString())
            }
            const createdCommentId = await commentsRepository.createComment(newComment)
            if (createdCommentId) {
                return await commentsQueryRepository.findComment(createdCommentId)
            }
        }

    }
}