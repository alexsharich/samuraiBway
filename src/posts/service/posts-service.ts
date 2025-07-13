import {InputPostType, OutputPostType} from "../../input-output-types/post-types";
import {PostModel} from "../../db/post-db-type";
import {mapToOutputPost} from "../repositories/post-query-repository";
import {BlogsQueryRepository} from "../../blogs/repositories/blogs-query-repository";
import {PostsRepository} from "../repositories/posts-repository";
import {inject, injectable} from "inversify";


export type PostType = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

@injectable()
export class PostsService {
    constructor(@inject(PostsRepository) private postsRepository: PostsRepository, @inject(BlogsQueryRepository) private blogsQueryRepository: BlogsQueryRepository) {

    }

    async deletePost(id: string) {
        return await this.postsRepository.deletePost(id)
    }

    async createPost(body: InputPostType): Promise<string | null> {
        const existBlog = await this.blogsQueryRepository.findBlog(body.blogId)///к сервису или репе
        if (existBlog) {
            const newPost: PostType = {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString())
            }
            return await this.postsRepository.createPost(newPost)
        } else {
            return null
        }
    }

    async updatePost({params, body}: any): Promise<any> {
        return await this.postsRepository.updatePost({params, body})
    }

    async findPost(id: string): Promise<OutputPostType | null> {

        const post = await PostModel.findById(id)
        if (!post) {
            return null
        }
        return mapToOutputPost(post)
    }
}