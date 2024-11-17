import {ObjectId} from "mongodb";
import {blogsCollection, commentsCollection} from "../../repositories/DB";
import {postsRepository} from "../../posts/repositories/posts-repository";
import {postsQueryRepository} from "../../posts/repositories/post-query-repository";
import {CommentType} from "../service/comments-service";
import {mapToOutputBlog} from "../../blogs/repositories/blogs-query-repository";

export const commentsRepository = {
    async findById(id: string) {
        try {
            const commentId = new ObjectId(id)
            const comment = await commentsCollection.findOne({_id: commentId})
            if (comment) {
                return comment
            }
            throw new Error('Comment doesnt exist ... ')
        } catch (error) {
            return null
        }
    },

    async deleteComment(id: string) {
        try {
            const commentId = new ObjectId(id)
            const result = await commentsCollection.deleteOne({_id: commentId})
            if (result.deletedCount === 1) return true
            return false
        } catch (e) {
            return false
        }
    },
    async deleteAllComments() {
        try {
            await commentsCollection.deleteMany({})
        } catch (e) {
            throw new Error('Delete... Something wrong')
        }
    },
    async createComment(newComment: CommentType): Promise<any> {
        try {
            const createdComment = await commentsCollection.insertOne(newComment)
            console.log('CREATED COMMENT : ', createdComment)
            return createdComment.insertedId.toHexString()
        } catch (error) {
            console.log('Create blog error : ', error)
            return null
        }
    },
    async updateComment(commentId,content): Promise<any> {
        try {
            const id = new ObjectId(commentId)
            const result = await commentsCollection.updateOne({_id: id}, {
                $set: {
                    content: content,
                }
            })
            if (result.matchedCount === 1) return await commentsCollection.findOne({_id: commentId})
            return null
        } catch (e) {
            return null
        }
    },
}