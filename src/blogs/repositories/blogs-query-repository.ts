import {OutputBlogType} from "../../input-output-types/blog-types";
import {BlogDBType} from "../../db/blog-db-type";
import {ObjectId, WithId} from "mongodb";
import {blogsCollection, postsCollection} from "../../repositories/DB";
import {PaginationQueriesType} from "../../helpers/pagination_values";
import {PostDBType} from "../../db/post-db-type";
import {mapToOutputPost} from "../../posts/repositories/post-query-repository";


export const mapToOutput = (blog: WithId<BlogDBType>): OutputBlogType => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    }
}

export type SortMongoType = {
    [key: string]: 1 | -1
}

export const blogsQueryRepository = {
    async getBlogs(query: PaginationQueriesType): Promise<any> {
        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection  === 'asc' ? 1 : -1
            const searchNameTerm = query.searchNameTerm
            let filter = {}
            if (searchNameTerm) {
                filter = {$regex: searchNameTerm, $option: 'i'}
            }

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType

            const blogs = await blogsCollection.find(filter)
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(+pageSize)
                .toArray()

            const totalCount = await blogsCollection.countDocuments(filter)
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: blogs.map((blogs: WithId<BlogDBType>)=>mapToOutput(blogs))
            }

        } catch (e) {
            console.log('blogs query repo / get blogs : ',e)
            throw new Error('Blogs not found')
        }
    },

    async findBlog(id: string): Promise<BlogDBType | null> {
        console.log('id ', id)
        try {
            const blogId = new ObjectId(id)

            const blog = await blogsCollection.findOne({_id: blogId})
            if (blog) return mapToOutput(blog)
            return null
        } catch (e) {
            console.log('Blog repository, find blog / find blog ', e)
            return null
        }
    },
}