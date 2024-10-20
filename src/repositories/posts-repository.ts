import {PostDBType} from "../db/post-db-type";
import {InputPostType, OutputPostType} from "../input-output-types/post-types";
import {blogsRepository} from "./blogs-repository";
import {postsCollection} from "./DB";
import {ObjectId, WithId} from "mongodb";


const mapToOutput = (post: WithId<PostDBType>): OutputPostType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        createdAt: post.createdAt,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName
    }
}

export const postsRepository = {
    async findPost(id: string): Promise<PostDBType | null> {

        try {
            const postId = new ObjectId(id)
            const post = await postsCollection.findOne({_id: postId})
            if (post) return mapToOutput(post)
            return null
        } catch (e) {
            return null
        }
    },
    async getPosts(): Promise<PostDBType[]> {
        try {
            const posts = await postsCollection.find({}).toArray()
            return posts.map(mapToOutput)
        } catch (e) {
            throw new Error('Posts not found...')
        }

    },
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
    async createPost(body: InputPostType): Promise<ObjectId | null> {
        try {
            const existBlog = await blogsRepository.findBlog(body.blogId)
            if (existBlog) {
                const newPost = {
                    title: body.title,
                    shortDescription: body.shortDescription,
                    content: body.content,
                    blogId: body.blogId,
                    blogName: existBlog.name,
                    createdAt: (new Date().toISOString())
                }
                const result = await postsCollection.insertOne(newPost)
                return result.insertedId
            } else {
                return null
            }
        } catch (e) {
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