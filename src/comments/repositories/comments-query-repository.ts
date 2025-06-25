import {commentsCollection} from "../../repositories/DB";
import {ObjectId, WithId} from "mongodb";

import {CommentDBType} from "../../db/comment-db-type";
import {SortMongoType} from "../../blogs/repositories/blogs-query-repository";
import {PaginationQueriesCommentType} from "../../helpers/pagination_values";

export const mapToOutputComment = (comment: WithId<CommentDBType>): any => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt: comment.createdAt
    }
}


export class CommentsQueryRepository {
    async findComment(id: string) {

        try {
            const commentId = new ObjectId(id)
            const comment = await commentsCollection.findOne({_id: commentId})
            if (comment) return mapToOutputComment(comment)
            return null
        } catch (e) {
            return null
        }
    }

    async getComments(query: PaginationQueriesCommentType, postId: string) {
        try {
            const pageNumber = +query.pageNumber
            const pageSize = +query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1
            let filter = {postId}

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
            const comments = await commentsCollection
                .find(filter)
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray()

            const totalCount = await commentsCollection.countDocuments(filter)
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: comments.map(comment => mapToOutputComment(comment))
            }
        } catch (e) {

            console.log('Get posts for selected blog Error')
            return null
        }
    }

}