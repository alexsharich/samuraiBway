import {ObjectId} from "mongodb";
import {PostType} from "../service/posts-service";
import {injectable} from "inversify";
import {PostModel} from "../../db/post-db-type";

@injectable()
export class PostsRepository {


    async deletePost(id: string) {
        const postId = new ObjectId(id)
        const result = await PostModel.deleteOne(postId).exec()
        if (result.deletedCount === 1) return true
        return false
    }

    async createPost(newPost: PostType): Promise<string> {
        const createdPost = await PostModel.insertOne(newPost)
        await createdPost.save()
        return createdPost._id.toString()
    }

    async updatePost({params, body}: any): Promise<any> {
        const postId = new ObjectId(params)
        const post = await PostModel.findById(postId).exec()
        if (!post) {
            return false
        }
        post.title = body.title
        post.content = body.content
        post.shortDescription = body.shortDescription
        post.blogId = body.blogId
        await post.save()

        await PostModel.findById(postId).exec() // TODO все ли верно ?
    }
}