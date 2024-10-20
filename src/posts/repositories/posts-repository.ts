import {ObjectId, WithId} from "mongodb";
import {postsCollection} from "../../repositories/DB";
import {PostType} from "../service/posts-service";



export const postsRepository = {


    async deletePost(id: string) {
        try {
            const postId = new ObjectId(id)
            const result = await postsCollection.deleteOne({_id: postId})
            if (result.deletedCount === 1) return true
            return false
        } catch (e) {
            return false
        }
    },
    async deleteAllPosts() {
        try {
            await postsCollection.deleteMany({})
        } catch (e) {
            throw new Error('Delete... Something wrong')
        }
    },
    async createPost(newPost: PostType): Promise<string | null> {
        try {
            const createdPost = await postsCollection.insertOne(newPost)
            return createdPost.insertedId.toHexString()
        } catch (e) {
            console.log('Create post repo  erro',e)
            return null
        }
    },
    async updatePost({params, body}: any): Promise<any> {
        try {
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
        } catch (e) {
            return null
        }
    }
}