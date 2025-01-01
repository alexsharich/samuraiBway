import {InputPostType} from "../../input-output-types/post-types";
import {postsRepository} from "../repositories/posts-repository";
import {blogsQueryRepository} from "../../blogs/repositories/blogs-query-repository";


export type PostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export const postsService = {
    async deletePost(id: string) {
        return await postsRepository.deletePost(id)
    },
    async createPost(body: InputPostType): Promise<string | null> {
        const existBlog = await blogsQueryRepository.findBlog(body.blogId)///к сервису или репе
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
    async updatePost({params, body}: any): Promise<any> {
        return await postsRepository.updatePost({params, body})
    }
}