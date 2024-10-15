import {PostDBType} from "../db/post-db-type";
import {InputPostType} from "../input-output-types/post-types";
import {ObjectId,} from "mongodb";
import {postsCollection} from "../repositories/DB";
import {blogsRepository} from "../repositories/blogs-repository";
import {postsRepository} from "../repositories/posts-repository";
import {blogsService} from "./blogs-service";


export type PostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export const postsService = {
    async findPost(id: string): Promise<PostDBType | null> {
        return await postsRepository.findPost(id)
    },
    async getPosts(): Promise<PostDBType[]> {
        return await postsRepository.getPosts()
    },
    async deletePost(id: string) {
        return await postsRepository.deletePost(id)
    },
    async deleteAllPosts() {
        return await postsRepository.deleteAllPosts()
    },
    async createPost(body: InputPostType): Promise<ObjectId | null> {
            const existBlog = await blogsService.findBlog(body.blogId)///к сервису или репе
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