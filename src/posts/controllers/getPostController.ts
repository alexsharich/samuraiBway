import {Request, Response} from 'express'
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination_values";
import {postsQueryRepository} from "../repositories/post-query-repository";

export const getPostController = async (req: Request<{},{},{},PaginationQueriesType>, res: Response) => {
    const sortFilter = paginationQueries(req.query)
    const posts = await postsQueryRepository.getAllPosts(sortFilter)
    if (posts) {
        res.status(200).json(posts)
    }
}