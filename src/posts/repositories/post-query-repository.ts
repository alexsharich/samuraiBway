import {PaginationQueriesType} from "../../helpers/pagination_values";
import {blogsCollection} from "../../repositories/DB";
import {ObjectId} from "mongodb";
import {PostDBType, PostDocument, PostModel} from "../../db/post-db-type";
import {OutputPostType} from "../../input-output-types/post-types";
import {OutputBlogType} from "../../input-output-types/blog-types";
import {SortMongoType} from "../../blogs/repositories/blogs-query-repository";
import {injectable} from "inversify";

export const mapToOutputPost = (post: PostDocument): OutputPostType => {
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

@injectable()
export class PostsQueryRepository {
    async getPostsForSelectedBlog({blogId, query}: { blogId: string, query: PaginationQueriesType }): Promise<any> {

        const pageNumber = query.pageNumber
        const pageSize = query.pageSize
        const sortBy = query.sortBy
        const sortDirection = query.sortDirection === 'asc' ? 1 : -1

        let filter = {blogId: blogId}

        const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType
        const posts = await PostModel
            .find(filter).sort(sortFilter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean().exec()

        const totalCount = await PostModel.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: posts.map((post: PostDocument) => mapToOutputPost(post))
        }
    }

    async getAllPosts(query: PaginationQueriesType): Promise<any> {
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
        const posts = await PostModel
            .find(filter)
            .sort(sortFilter)
            .skip((pageNumber - 1) * pageSize)
            .limit(+pageSize)
            .lean().exec()

        const totalCount = await blogsCollection.countDocuments(filter)


        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: posts.map((post: PostDocument) => mapToOutputPost(post))
        }
    }

    async findPost(id: string): Promise<PostDBType | null> {

        const postId = new ObjectId(id)
        const post = await PostModel.findById(postId).exec()
        if (post) return mapToOutputPost(post)
        return null

    }
}