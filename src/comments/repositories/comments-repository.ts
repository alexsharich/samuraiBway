import {ObjectId} from "mongodb";
import {injectable} from "inversify";
import {CommentDocument, CommentModel} from "../../db/comment-db-type";

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

    async createComment(newComment: CommentDocument): Promise<any> {
        try {
            const createdComment = await CommentModel.insertOne(newComment)
            await createdComment.save()
            return createdComment._id.toString()
        } catch (error) {
            console.log('Create blog error : ', error)
            return null
        }
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