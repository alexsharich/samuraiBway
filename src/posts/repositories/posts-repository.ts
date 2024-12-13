import {ObjectId} from "mongodb";
import {postsCollection} from "../../repositories/DB";
import {PostType} from "../service/posts-service";


export const postsRepository = {


    async deletePost(id: string) {
        const postId = new ObjectId(id)
        const result = await postsCollection.deleteOne({_id: postId})
        if (result.deletedCount === 1) return true
        return false
    },
    async createPost(newPost: PostType): Promise<string> {
        const createdPost = await postsCollection.insertOne(newPost)
        return createdPost.insertedId.toHexString()
    },
    async updatePost({params, body}: any): Promise<any> {
        const postId = new ObjectId(params)
        const result = await postsCollection.updateOne({_id: postId}, {
            $set: {
                title: body.title,
                content: body.content,
                shortDescription: body.shortDescription,
                blogId: body.blogId
            }
        })
        if (result.matchedCount === 1) return await postsCollection.findOne({_id: postId})
        return null
    }
}