import {InputPostType, OutputPostType} from "../../input-output-types/post-types";
import {PostDocument, PostModel} from "../../db/post-db-type";
import {mapToOutputPost} from "../repositories/post-query-repository";
import {BlogsQueryRepository} from "../../blogs/repositories/blogs-query-repository";
import {PostsRepository} from "../repositories/posts-repository";
import {inject, injectable} from "inversify";
import {LikeStatus} from "../../db/comment-db-type";
import {LikePostModel} from "../../db/like-post-db-type";
import {UserModel} from "../../db/user-db-type";


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
        const existBlog = await this.blogsQueryRepository.findBlog(body.blogId)
        if (existBlog) {
            const newPost = new PostModel({...body, blogName: existBlog.name})
            return this.postsRepository.save(newPost)
        } else {
            return null
        }
    }

    async changeLikeStatus(postId: string, newStatus: LikeStatus, userId: string) {
        const post = await PostModel.findById(postId).exec()
        if (!post) {
            return false
        }

        const userLikeStatus = await LikePostModel.findOne({userId, postId}).exec()

        if (!userId) {
            return false
        }
        post.changeLikeStatus(newStatus, userLikeStatus?.myStatus)
        if (!userLikeStatus) {
            const user = await UserModel.findById(userId).exec()
            if (!user) {
                return false
            }
            const newLike = new LikePostModel({
                postId,
                userId,
                myStatus: newStatus,
                login: user.accountData.userName
            })
            await newLike.save()
        } else {
            if (userLikeStatus.myStatus !== newStatus) {
                userLikeStatus.myStatus = newStatus
                await userLikeStatus.save()
            }
        }
        await this.postsRepository.save(post)
        return true
    }


    async updatePost({params, body}: any): Promise<any> {
        return await this.postsRepository.updatePost({params, body})
    }

    async findPost(id: string): Promise<PostDocument | null> {

        const post = await PostModel.findById(id).exec()
        if (!post) {
            return null
        }
        return post
    }
}