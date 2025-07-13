import {OutputBlogType} from "../../input-output-types/blog-types";
import {BlogDBType, BlogDocument, BlogModel} from "../../db/blog-db-type";
import {PaginationQueriesType} from "../../helpers/pagination_values";
import {injectable} from "inversify";


export const mapToOutputBlog = (blog: BlogDocument): OutputBlogType => {
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

@injectable()
export class BlogsQueryRepository {
    async getBlogs(query: PaginationQueriesType): Promise<any> {
        try {
            const pageNumber = query.pageNumber
            const pageSize = query.pageSize
            const sortBy = query.sortBy
            const sortDirection = query.sortDirection === 'asc' ? 1 : -1
            const searchNameTerm = query.searchNameTerm
            let filter = {}
            if (searchNameTerm) {
                filter = {name: {$regex: searchNameTerm, $options: 'i'}}
            }

            const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType

            const blogs = await BlogModel.find(filter)
                .sort(sortFilter)
                .skip((pageNumber - 1) * pageSize)
                .limit(pageSize)
                .lean().exec()
            const totalCount = await BlogModel.countDocuments(filter)
            return {
                pagesCount: Math.ceil(totalCount / query.pageSize),
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: totalCount,
                items: blogs.map((blog: BlogDocument) => mapToOutputBlog(blog))
            }
        } catch (e) {
            console.log('blogs query repo / get blogs : ', e)
            throw new Error('Blogs not found')
        }
    }

    async findBlog(id: string): Promise<BlogDBType | null> {
        const blog = await BlogModel.findById(id).exec()
        if (!blog) {
            return null
        }
        return mapToOutputBlog(blog)
    }
}