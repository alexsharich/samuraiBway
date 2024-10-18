import {BlogDBType} from "../../db/blog-db-type";
import {InputBlogType, OutputBlogType} from "../../input-output-types/blog-types";
import {ObjectId} from "mongodb";
import {PostType} from "../../posts/service/posts-service";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../../posts/repositories/posts-repository";
import {postsQueryRepository} from "../../posts/repositories/post-query-repository";
import {PaginationQueriesType} from "../../helpers/pagination_values";

export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    isMembership: boolean,
    createdAt: string
}
export const blogsService = {
    async findBlog(id: string): Promise<BlogDBType | null> {
        return await blogsRepository.findBlog(id)
    },
    async getBlogs(): Promise<OutputBlogType[]> {
        return await blogsRepository.getBlogs()
    },
    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
    },
    async deleteAllBlogs() {
        return await blogsRepository.deleteAllBlogs()
    },
    async createBlog({name, description, websiteUrl}: InputBlogType): Promise<ObjectId | null> {

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
    async createPostForSelectedBlog({blogId, body}) {
        const existBlog = await blogsService.findBlog(blogId)///к сервису или репе
        if (existBlog) {
            const newPost: PostType = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString())
            }
            return await postsRepository.createPost(newPost)
        } else {
            return null
        }
    },
    async getPostsForSelectedBlog({blogId, query}: { blogId: string, query: PaginationQueriesType }): Promise<any> {
        try{
            const posts = await postsQueryRepository.getPostsForSelectedBlog({blogId, query})
            const postsCount = await postsQueryRepository.getPostsForSelectedBlogCount(blogId)
            return {
                pagesCount: Math.ceil(postsCount / query.pageSize), //определить
                page: query.pageNumber,
                pageSize: query.pageSize,
                totalCount: postsCount, //определить
                items: posts
            }
        }catch(e){
            console.log('Error get posts for selected blog')
            return null
        }
    },
}