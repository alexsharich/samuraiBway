import {Request} from "express";
import {
    paginationQueries,
    paginationQueriesComment,
    PaginationQueriesCommentType
} from "../../helpers/pagination_values";
import {postsQueryRepository} from "../repositories/post-query-repository";
import {commentsQueryRepository} from "../../comments/repositories/comments-query-repository";

export const getCommentsForPostController =async (req: Request<{id:string}, {},{}, PaginationQueriesCommentType>, res: any)=>{
    const postId = req.params.id
    const isPostExist = await postsQueryRepository.findPost(postId)
    if(!isPostExist){
        res.sendStatus(404)
        return
    }
    const sortFilter = paginationQueriesComment(req.query)
    const posts = await commentsQueryRepository.getComments(sortFilter,postId)
    if (posts) {
        res.status(200).json(posts)
        return
    }
}
