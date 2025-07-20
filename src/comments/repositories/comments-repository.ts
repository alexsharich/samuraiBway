import {ObjectId} from "mongodb";
import {injectable} from "inversify";
import {CommentDBType, CommentDocument, CommentModel, CommentModelType, LikeStatus} from "../../db/comment-db-type";
import {LikeModel} from "../../db/like-comment-db-type";

@injectable()
export class CommentsRepository {
    async findById(id: string) {
        try {
            const comment = await CommentModel.findById(id).exec()
            if (comment) {
                return comment
            }
            throw new Error('Comment doesnt exist ... ')
        } catch (error) {
            return null
        }
    }

    async deleteComment(id: string) {
        try {
            const commentId = new ObjectId(id)
            const result = await CommentModel.deleteOne({_id: commentId}).exec()
            if (result.deletedCount === 1) {
                return true
            }
            return false
        } catch (e) {
            return false
        }
    }

    async deleteAllComments() {
        try {
            await CommentModel.deleteMany({}).exec()
        } catch (e) {
            throw new Error('Delete... Something wrong')
        }
    }

    async createComment(newComment: CommentDBType): Promise<any> {
        try {
            const comment = new CommentModel(newComment)
            await comment.save()
            // const createdComment = await CommentModel.insertOne(newComment)
            // // await createdComment.save()
            return comment._id.toString()
        } catch (error) {
            console.log('Create blog error : ', error)
            return null
        }
    }

    async updateLikeStatus(status: LikeStatus, commentId: string, userId: string) {
        const comment = await CommentModel.findById(commentId).exec()
        if (!comment) {
            throw new Error('Comment not found')
        }

        const like = await LikeModel.findOne({commentId, userId}).exec()

        const userLikeStatus = comment.likeInfo

        if (status === "Like") {
            if (like.myStatus === "Dislike") {
                userLikeStatus.dislikeCount--
                userLikeStatus.likeCount++
            }
            if (!like.myStatus) {
                userLikeStatus.likeCount++
            }
        }
        if (status === "Dislike") {

            if (like.myStatus === "Like") {
                userLikeStatus.likeCount--
                userLikeStatus.dislikeCount++
            }
            if (!like.myStatus) {
                userLikeStatus.dislikeCount++
            }
        }
        if (status === "None") {
            if (like.myStatus === "Like") {
                userLikeStatus.likeCount--
            }
            if (like.myStatus === "Dislike") {
                userLikeStatus.dislikeCount--
            }
        }
        await comment.save()

        if (!like) {
            const newLike = new LikeModel({commentId, userId, myStatus: status})
            await newLike.save()
            return
        }

        like.myStatus = status

        await like.save()
    }

    async updateComment(commentId: string, content: string): Promise<any> {
        try {
            const comment = await CommentModel.findById(commentId).exec()
            if (!comment) {
                return null
            }
            comment.content = content
            await comment.save()
            await CommentModel.findById(comment._id)
        } catch (e) {
            return null
        }
    }
}