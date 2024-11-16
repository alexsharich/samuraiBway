import {ObjectId} from "mongodb";
import {commentsCollection} from "../../repositories/DB";

export const commentsRepository = {


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
    async createComment() {

    },
    async updateComment({params, body}: any): Promise<any> {
        try {
            const commentId = new ObjectId(params)
            const result = await commentsCollection.updateOne({_id: commentId}, {
                $set: {
                    content: body.content,
                }
            })
            if (result.matchedCount === 1) return await commentsCollection.findOne({_id: commentId})
            return null
        } catch (e) {
            return null
        }
    }
}