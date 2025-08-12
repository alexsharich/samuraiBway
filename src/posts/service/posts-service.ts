import {InputPostType, OutputPostType} from "../../input-output-types/post-types";
import {PostModel} from "../../db/post-db-type";
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
            const newPost = PostModel.createInstance({...body, BlogName: existBlog.name})
            return this.postsRepository.save(newPost)
        } else {
            return null
        }
    }

    async changeLikeStatus(postId: string, newStatus: LikeStatus, userId: string) {
        const post = await PostModel.findOne(postId).exec()
        if (!post) {
            return false
        }

        const userLikeStatus = await LikePostModel.findOne({userId}).exec()

        if (!userId) {
            return 'User likeStatus not found'
        }
        if (!userLikeStatus) {
            const user = await UserModel.findById(userId).exec()
            if (!user) {
                return 'User not found'
            }
            const newLike = new LikePostModel({
                postId,
                userId,
                myStatus: newStatus,
                login: user.accountData.userName
            })
            await newLike.save()
        }
        else {
            if(userLikeStatus.myStatus !== newStatus){
                userLikeStatus.myStatus = newStatus
                await userLikeStatus.save()
            }
        }
        post.changeLikeStatus(newStatus, userLikeStatus.myStatus)
        await this.postsRepository.save(post)
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