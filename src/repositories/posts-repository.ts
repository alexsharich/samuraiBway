import {PostDBType} from "../db/post-db-type";
import {InputPostType} from "../input-output-types/post-types";
import {blogsRepository} from "./blogs-repository";
import {postsCollection} from "./DB";




export const postsRepository = {
    async findPost(id: string): Promise<PostDBType | null> {
        const post = await postsCollection.findOne({id: id})
        if (post) {
            return post
        } else {
            return null
        }
        //return DB.posts.find((post: PostDBType) => post.id === id)
    },
    async getPosts(): Promise<PostDBType[]> {
        return await postsCollection.find({}).toArray()
        //return DB.posts
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        if (result.deletedCount === 1) {
            return true
        } else {
            return false
        }

    },
    async deleteAllPosts(){
        await postsCollection.deleteMany({})
    },
    async createPost(body: InputPostType): Promise<string | null> {
        const existBlog = await blogsRepository.findBlog( body.blogId )
        if(existBlog){
            const newPost = {
                //_id:new ObjectId(),
                id: new Date().toISOString() + Math.random(),
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId,
                blogName: existBlog.name,
                createdAt: (new Date().toISOString())
            }
            const result = await postsCollection.insertOne(newPost)
            //DB.posts = [...DB.posts, newPost]
            return newPost.id
        }else {
            return null
        }

    },
    async updatePost({params, body}: any): Promise<any> {
        const result = await postsCollection.updateOne({id: params}, {
            title: body.title,
            content: body.content,
            shortDescription: body.shortDescription,
            blogId: body.blogId
        })
        if(result.matchedCount ===1){
            return await postsCollection.findOne({id:params})
        }else{
            return null
        }
        /*const postForUpdate = DB.posts.find((post: PostDBType) => post.id === params)
        if (postForUpdate) {
            postForUpdate.title = body.title,
                postForUpdate.content = body.content,
                postForUpdate.shortDescription = body.shortDescription
            postForUpdate.blogId = body.blogId
            return postForUpdate
        }
        return null*/
    }

}