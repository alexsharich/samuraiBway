import {InputBlogType} from "../../input-output-types/blog-types";
import {PostType} from "../../posts/service/posts-service";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../../posts/repositories/posts-repository";
import {blogsQueryRepository} from "../repositories/blogs-query-repository";
import {InputPostForBlogType} from "../../input-output-types/post-types";

export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    isMembership: boolean,
    createdAt: string
}
export const blogsService = {
    async deleteBlog(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlog(id)
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
    async createPostForSelectedBlog({blogId, body}:{blogId:string,body:InputPostForBlogType}) {
        const existBlog = await blogsQueryRepository.findBlog(blogId)
        if (existBlog) {
            const newPost: PostType = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString()), //existBlog.createdAt
            }
            return await postsRepository.createPost(newPost)
        } else {
            return null
        }
    },
}