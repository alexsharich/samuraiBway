import { postsCollection} from "../../repositories/DB";
import {ObjectId, WithId} from "mongodb";

import {CommentDBType} from "../../db/comment-db-type";

export const mapToOutputComment = (comment: WithId<CommentDBType>): any => {
    return {
      id: comment._id.toString(),
      content: comment.content,
      commentatorInfo: {
         userId: comment._id.toString(),
         userLogin: comment.commentatorInfo,
  },
      createdAt: comment.createdAt
    }
}



export const commentsQueryRepository = {
    async findComment(id: string) {

        try {
            const commentId = new ObjectId(id)
            const comment = await postsCollection.findOne({_id: commentId})
            if (comment) return mapToOutputComment(comment)
            return null
        } catch (e) {
            return null
        }
    },

}