import {PaginationQueriesType} from "../../helpers/pagination_values";
import {blogsCollection, postsCollection} from "../../repositories/DB";
import {ObjectId, WithId} from "mongodb";
import {PostDBType} from "../../db/post-db-type";
import {OutputPostType} from "../../input-output-types/post-types";
import {OutputBlogType} from "../../input-output-types/blog-types";
import {SortMongoType} from "../../blogs/repositories/blogs-query-repository";

export const mapToOutputPost = (post: WithId<PostDBType>): OutputPostType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        createdAt: post.createdAt,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName
    }
}

export type MapToOutputWithPagination = {
    "pagesCount": number,
    "page": number,
    "pageSize": number,
    "totalCount": number,
    "items": Array<OutputPostType> | Array<OutputBlogType>
}

export const postsQueryRepository = {
    async getPostsForSelectedBlog({blogId, query}: { blogId: string, query: PaginationQueriesType }): Promise<any> {

        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1

            let filter = {blogId: blogId}

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
            const posts= await postsCollection
                .find(filter).sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .toArray()

            const totalCount = await postsCollection.countDocuments(filter)

            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: posts.map((post: WithId<PostDBType>)=>mapToOutputPost(post))
            }

        } catch (e) {
            console.log('Get posts for selected blog Error')
            return null
        }
    },

    async getAllPosts(query: PaginationQueriesType ): Promise<any> {
        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1
            const searchNameTerm = query.searchNameTerm
            let filter = {}
            if (searchNameTerm) {
                filter = {$regex: searchNameTerm, $option: 'i'}
            }
            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
            const posts = await postsCollection
                .find(filter)
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
                items: posts.map((post: WithId<PostDBType>)=>mapToOutputPost(post))
            }
        } catch (e) {

            console.log('Get posts for selected blog Error')
            return null
        }
    },

    async findPost(id: string): Promise<PostDBType | null> {

        try {
            const postId = new ObjectId(id)
            const post = await postsCollection.findOne({_id: postId})
            if (post) return mapToOutputPost(post)
            return null
        } catch (e) {
            return null
        }
    },

}