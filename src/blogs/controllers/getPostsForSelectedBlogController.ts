import {Request, Response} from 'express'
import {paginationQueries, PaginationQueriesType} from "../../helpers/pagination_values";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {postsQueryRepository} from "../../posts/repositories/post-query-repository";

export const getPostsForSelectedBlogController = async (req: Request<{
    id: string
}, {}, {}, PaginationQueriesType>, res: Response) => {

    const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = paginationQueries(req.query)
    const blogId: string = req.params.id
    const blog = await blogsQueryRepository.findBlog(blogId)
    if(!blog){
        res.sendStatus(404)
        return
    }
    const posts = await postsQueryRepository.getPostsForSelectedBlog({
        blogId,
        query: {pageSize, pageNumber, sortDirection, sortBy, searchNameTerm}
    })


    if (!posts) {
      res.sendStatus(404)
        return
    }
    res.status(200).send(posts)
}