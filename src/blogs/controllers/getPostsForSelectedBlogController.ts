import {Request, Response} from 'express'
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination_values";
import {blogsService} from "../service/blogs-service";

export const getPostsForSelectedBlogController = async (req: Request<{
    id: string
}, {}, {}, PaginationQueriesType>, res: Response) => {

    const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = paginationQueries(req.query)
    const blogId: string = req.params.id
    const posts = await blogsService.getPostsForSelectedBlog({
        blogId,
        query: {pageSize, pageNumber, sortDirection, sortBy, searchNameTerm}
    })

    if (!posts) {
      res.sendStatus(404)
        return
    }
    res.status(200).send(posts)
}