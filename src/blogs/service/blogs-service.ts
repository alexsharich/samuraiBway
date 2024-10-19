import {BlogDBType} from "../../db/blog-db-type";
import {InputBlogType} from "../../input-output-types/blog-types";
import {PostType} from "../../posts/service/posts-service";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../../posts/repositories/posts-repository";
import {MapToOutputWithPagination, postsQueryRepository,mapToOutputPost} from "../../posts/repositories/post-query-repository";
import {PaginationQueriesType} from "../../helpers/pagination_values";
import {blogsQueryRepository, mapToOutput} from "../repositories/blogs-query-repository";
import {WithId} from "mongodb";
import {PostDBType} from "../../db/post-db-type";
import {InputPostForBlogType, InputPostType} from "../../input-output-types/post-types";

export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    isMembership: boolean,
    createdAt: string
}
export const blogsService = {
    async findBlog(id: string): Promise<BlogDBType | null> {
        return await blogsQueryRepository.findBlog(id)
    },
    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    },
    async deleteAllBlogs() {
        return await blogsRepository.deleteAllBlogs()
    },
    async createBlog({name, description, websiteUrl}: InputBlogType): Promise<string | null> {

        const newBlog: BlogType = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: (new Date().toISOString())
        }

        return await blogsRepository.createBlog(newBlog)
    },
    async updateBlog({params, body}: any) {
        return await blogsRepository.updateBlog({params, body})
    },
    async createPostForSelectedBlog({blogId, body}:{blogId:string,body:InputPostForBlogType}) {// any any any
        const existBlog = await blogsService.findBlog(blogId)///к сервису или репе
        if (existBlog) {
            const newPost: PostType = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString())
            }
            return await postsRepository.createPost(newPost)
        } else {
            return null
        }
    },
}