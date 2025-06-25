import {InputBlogType} from "../../input-output-types/blog-types";
import {PostType} from "../../posts/service/posts-service";

import {InputPostForBlogType} from "../../input-output-types/post-types";
import {BlogsRepository} from "../repositories/blogs-repository";
import {BlogsQueryRepository} from "../repositories/blogs-query-repository";
import {PostsRepository} from "../../posts/repositories/posts-repository";

export type BlogType = {
    name: string,
    description: string,
    websiteUrl: string,
    isMembership: boolean,
    createdAt: string


}

export class BlogsService {
    constructor(private blogsRepository: BlogsRepository, private postsRepository: PostsRepository, private blogsQueryRepository: BlogsQueryRepository) {

    }

    async deleteBlog(id: string): Promise<boolean> {
        return await this.blogsRepository.deleteBlog(id)
    }

    async createBlog({name, description, websiteUrl}: InputBlogType): Promise<string | null> {

        const newBlog: BlogType = {
            name: name,
            description: description,
            websiteUrl: websiteUrl,
            isMembership: false,
            createdAt: (new Date().toISOString())
        }

        return await this.blogsRepository.createBlog(newBlog)
    }

    async updateBlog({params, body}: any) {
        return await this.blogsRepository.updateBlog({params, body})
    }

    async createPostForSelectedBlog({blogId, body}: { blogId: string, body: InputPostForBlogType }) {
        const existBlog = await this.blogsQueryRepository.findBlog(blogId)
        if (existBlog) {
            const newPost: PostType = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString()), //existBlog.createdAt
            }
            return await this.postsRepository.createPost(newPost)
        } else {
            return null
        }
    }
}