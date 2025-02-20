import {Request, Response} from 'express'
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination_values";
import {MapToOutputWithPagination} from "../../posts/repositories/post-query-repository";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";

export const getBlogController = async (req: Request<{},{},{},PaginationQueriesType>, res: Response<MapToOutputWithPagination>) => {
    const sortFilter = paginationQueries(req.query)
    const blogs = await blogsQueryRepository.getBlogs(sortFilter)
    if (blogs) {
        res.status(200).send(blogs)
    }
}